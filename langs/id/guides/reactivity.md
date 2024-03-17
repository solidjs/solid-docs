# Reaktifitas

Manajemen data pada Solid dibuat dari seperangkat primitif-primitif reaktif yang fleksibel yang akan bertanggung jawab untuk semua pembaruan. Ini hampir sama yang dilakukan MobX atau Vue kecuali kita tidak mengorbankan granularitas untuk VDOM. Dependencies secara otomatis akan dilacak ketika kamu mengakses nilai reaktif kamu di Effects kamu dan kode JSX View.

Primitif-primitif pada Solid datang dengan berbentuk panggilan fungsi `create` yang biasanya mengembalikan tuples, dimana secara umum elemen pertamanya adalah primitif yang dapat dibaca dan yang keduanya sebuah "setter". Itu sesuatu yang umum untuk merujuk ke bagian yang dapat dibaca dengan nama primitifnya.

Berikut adalah penghitung kenaikan otomatis dasar yang diperbarui berdasarkan pengaturan signal `count`.

```jsx
import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));

  return <div>{count()}</div>;
};

render(() => <App />, document.getElementById("app"));
```

## Memperkenalkan Primitif-primitif

Solid terbentuk dari 3 primitif utama, Signal, Memo, dan Effect. Mereka mempunyai pola Observer dimana Signal (dan Memo) akan dilacak dengan membungkus Memo dan Effect.

Signal adalah primitif yang paling sederhana. Dia memiliki fungsi nilai, dan get dan set supaya kita dapat menangkap ketika mereka dipanggil atau diganti.


```js
const [count, setCount] = createSignal(0);
```

Effect adalah fungsi yang membungkus read dari signal kita dan mengeksekusi ulang ketika nilai yang bergantung ke Signal terganti. Ini berguna saat kita membuat side effect, seperti rendering.

```js
createEffect(() => console.log("The latest count is", count()));
```

Yang terakhir, Memo adalah nilai turunan yang di-cache. Mereka berbagi properti dengan Signal dan Effect. Mereka melacak Signal, yang bergantung kepada mereka, sendiri dan mengeksekusi ulang hanya ketika mereka terganti, dan mereka sendiri adalah Signal yang dapat dilacak.

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## Bagaimana mereka Bekerja

Signal adalah "event emitters" yang menyimpan daftar dari subscription. Mereka memberitahu subscribers mereka setiap kali nilai mereka berganti.

Yang lebih menariknya adalah bagaimana subscriptions ini terjadi. Solid menggunakan pelacakan dependency otomatis. Pembaruan terjadi secara otomatis setiap kali data berganti.

Triknya adalah tumpukan global saat runtime. Sebelum Effect atau Memo mengeksekusi (atau mengeksekusi ulang) fungsi yang telah disediakan developer, dia akan menumpukkan diri ke tumpukan tersebut. Lalu, setiap Signal yang membaca akan mengecek apakah ada listener di tumpukan dan jika ada tambahkan listener tersebut ke subscriptions mereka.

Kamu dapat memikirkannya seperti ini:

```js
function createSignal(value) {
  const subscribers = new Set();

  const read = () => {
    const listener = getCurrentListener();
    if (listener) subscribers.add(listener);
    return value;
  };

  const write = (nextValue) => {
    value = nextValue;
    for (const sub of subscribers) sub.run();
  };

  return [read, write];
}
```

Sekarang ketika kita melakukan pembaruan, Signal kita tahu mana Effect yang akan dijalankan ulang. Sederhana tapi efektif. Implementasi sebenarnya jauh lebih kompleks tapi seperti itulah inti dari bagaimana mereka bekerja.

Untuk memahami lebih detail bagaimana Reaktifitas bekerja, berikut artikel-artikel yang mungkin berguna untuk kamu:

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## Hal yang perlu dipertimbangkan

Pendekatan reaktifitas seperti ini bisa dibilang sangat kuat dan dinamis. Cara ini bisa menghandel dependencies yang berubah begitu saja dengan mengeksekusi cabang berbeda dari kode kondisional. Ia juga dapat bekerja pada banyak level indirection. Setiap fungsi yang tereksekusi didalam cakupan pelacakan akan dilacak juga.

Tetapi, ada beberapa kunci perilaku dan pertukaran yang perlu kita waspadai.

1. Semua reaktifitas akan terlacak dari panggilan fungsi mau itu secara langsung atau tersembunyi dibawah getter/proxy dan dapat dipicu oleh pengaksesan properti objek. Ini berarti tempat kamu mengakses properti objek reaktifitas sangatlah penting.

2. Komponen dan callbacks dari control flows bukanlah cakupan pelacakan dan hanya akan tereksekusi satu kali. Ini berarti meng-destructure atau melakukan tingkat-atas logika di komponen-komponen kamu tidak dapat ter-eksekusi ulang. Kamu harus mengakses Signal, Store, dan properti-properti ini dari dalam primitif-primitif reaktif lain atau JSX dari bagian kode itu untuk mengevaluasi ulang.

3. Pendekatan ini hanya melacak secara sinkron. Jika kamu punya sebuah `setTimeout` atau menggunakan fungsi asinkron di Effect, kode yang mengeksekusi asinkron setelah itu tidak akan terlacak.
