import { React, CodeBlock, dracula } from '../../../deps.ts';

const QuickStart = (props: any) => {

  return (
    <div className="docContainer">
      <h1>Quick Start</h1>
      <p><code className="obsidianInline">obsidian</code> is Deno's first native GraphQL caching client and server module.  Boasting lightning-fast caching and fetching capabilities alongside headlining normalization and destructuring strategies, <code className="obsidianInline">obsidian</code> is equipped to support scalable, highly performant applications.</p>
      <p>Optimized for use in server-side rendered React apps built with Deno, full stack integration of <code className="obsidianInline">obsidian</code> enables many of its most powerful features, including optimized caching exchanges between client and server and extremely lightweight client-side caching.</p>
      <h2>Installation</h2>
      <p>In the server:</p>
      <CodeBlock
        language="typescript"
        showLineNumbers={true}
        style={dracula}
      >
        {"import { ObsidianRouter } from 'https://deno.land/x/obsidian/mod.ts';"}
      </CodeBlock>
      <br/>
      <p>In the app:</p>
      <CodeBlock
        language="typescript"
        showLineNumbers={true}
        style={dracula}
      >
        {"import { ObsidianWrapper } from 'https://deno.land/x/obsidian/clientMod.ts';"}
      </CodeBlock>
      <br/>
      <h2>Creating the Router</h2>
      <CodeBlock
        language="typescript"
        showLineNumbers={true}
        style={dracula}
      >
        {`import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { ObsidianRouter, gql } from 'https://deno.land/x/obsidian/mod.ts';

const PORT = 8000;

const app = new Application();

const types = (gql as any)\`
  // Type definitions
\`;

const resolvers = {
  // Resolvers
}

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
});

app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

await app.listen({ port: PORT });`}
      </CodeBlock>
      <br/>
      <h2>Sending ObsidianSchema</h2>
      <CodeBlock
        language="tsx"
        showLineNumbers={true}
        style={dracula}
      >
        {`interface initialState {
  obsidianSchema?: any;
}

const initialState: initialState = {
  obsidianSchema: GraphQLRouter.obsidianSchema
}

const router = new Router();
router.get('/', handlePage);

function handlePage(ctx: any) {
  try {
    const body = (ReactDomServer as any).renderToString(<App />);
    ctx.response.body = \`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>SSR React App</title>
        <script>
          window.__INITIAL_STATE__ = \${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="root">\${body}</div>
        <script src="/static/client.tsx" defer></script>
      </body>
      </html>\`;
  } catch (error) {
    console.error(error);
  }
}

app.use(router.routes(), router.allowedMethods());`}
      </CodeBlock>
      <br/>
      <h2>Creating the Wrapper</h2>
      <CodeBlock
        language="tsx"
        showLineNumbers={true}
        style={dracula}
      >
        {`import { ObsidianWrapper } from 'https://deno.land/x/obsidian/clientMod.ts';

const App = () => {
  return (
    <ObsidianWrapper>
      <WeatherApp />
    </ObsidianWrapper>
  );
};`}
      </CodeBlock>
      <br/>
      <h2>Making a Query</h2>
      <CodeBlock
        language="tsx"
        showLineNumbers={true}
        style={dracula}
      >
        {`import { useObsidian } from 'https://deno.land/x/obsidian/clientMod.ts';

const WeatherApp = () => {
  const { gather } = useObsidian();
  const [weather, setWeather] = (React as any).useState('Sunny');

  return (
    <h1>{weather}</h1>
    <button
      onClick={() => {
        gather(\`query { getWeather { id description } }\`)
        .then(resp => setWeather(resp.data.getWeather.description))
      }}
    >Get Weather</button>
  );
};`}
      </CodeBlock>
      <br/>
    </div>
  )
}

export default QuickStart;
