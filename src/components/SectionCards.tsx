import { ChevronIcon } from "./Logo";

function Cards(props) {
  return (
    <section class="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
      {props.children}
    </section>
  );
}

export function SectionCards() {
  return (
    <Cards>
      <Card>
        <div>
          <h4 class="text-primary dark:text-primary-dark font-bold text-2xl leading-tight">
            Learn
          </h4>
          <div class="my-4">
            <p>
              Learn how to think in React with step-by-step explanations and
              interactive examples.
            </p>
          </div>
        </div>
        <div>
          <a
            class="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-white active:ring-0 active:ring-offset-0 leading-normal bg-link text-white hover:bg-opacity-80 text-base rounded-lg px-4 py-1.5"
            aria-label="Learn React"
            target="_self"
            href="/learn"
          >
            Read More
            <ChevronIcon />
          </a>
        </div>
      </Card>
      <Card>
        <div>
          <h4 class="text-primary dark:text-primary-dark font-bold text-2xl leading-tight">
            API Reference
          </h4>
          <div class="my-4">
            <p>
              Look up the API signatures of the various SolidStart modules, and
              see how could use them
            </p>
          </div>
        </div>
        <div>
          <a
            class="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-white active:ring-0 active:ring-offset-0 leading-normal bg-link text-white hover:bg-opacity-80 text-base rounded-lg px-4 py-1.5"
            aria-label="API Reference"
            target="_self"
            href="/apis"
          >
            Read More
            <ChevronIcon />
          </a>
        </div>
      </Card>
    </Cards>
  );
}
function Card(props) {
  return (
    <div class="flex flex-col justify-center">
      <div class="flex flex-col h-full bg-card dark:bg-card-dark shadow-inner justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3">
        {props.children}
      </div>
    </div>
  );
}
