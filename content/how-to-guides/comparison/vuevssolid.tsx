import { Component } from "solid-js";

const VueVsSolid: Component<{}> = () => {
  return (
    <table class="w-full text-center">
      <thead>
        <tr>
          <th>Vue(composition)</th>
          <th>Vue(options)</th>
          <th>Solid</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>onMounted()</td>
          <td>mounted</td>
          <td>onMount()</td>
        </tr>
        <tr>
          <td>onUnmounted()</td>
          <td>unmounted</td>
          <td>onCleanup()</td>
        </tr>
        <tr>
          <td>ref()</td>
          <td>data</td>
          <td>createSignal()</td>
        </tr>
        <tr>
          <td>reactive()</td>
          <td>data</td>
          <td>createStore()</td>
        </tr>
        <tr>
          <td>computed()</td>
          <td>computed</td>
          <td>createMemo()</td>
        </tr>
        <tr>
          <td>watchEffect()</td>
          <td>this.$watch() or watch</td>
          <td>createEffect()</td>
        </tr>
      </tbody>
    </table>
  );
};

export default VueVsSolid;
