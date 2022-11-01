export default function Dot(props: { number: number }) {
  return (
    <div class="rounded-full pt-1 w-6 h-6 border border-solid-lightitem dark:border-solid-darkitem grid place-content-center bg-solid-light dark:bg-white text-solid-accent font-bold">
      {props.number}
    </div>
  );
}
