export default function Dot(props: { number: number }) {
  return (
    <div class="rounded-full min-w-6 w-6 h-6 border border-solid-lightitem dark:border-solid-darkitem grid place-content-center bg-solid-light dark:bg-white text-solid-accent font-bold">
      <span>{props.number}</span>
    </div>
  );
}
