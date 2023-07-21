import { Aside } from "~/components/configurable/Aside";

<Title>Deploying To Railway</Title>

Here we're going to use [Railway](https://railway.app) to deploy our Solid project.

If you haven't heard of Railway, it's a platform where developers can host their web/cloud projects. For more information on Railway and what they offer make sure to visit their [website](https://railway.app).

## First Step: Changing The Start Command

With Railway we'll need to make use of a different `start` command in our package.json. Instead of it being `vite` we'll have to make use of `npx http-server ./dist`. As you've noticed we'll have to built the app in correct order to get the `dist` folder, so it would be better to make use of the unedited `dev` command when developing locally and leave the `start` command to be used when deploying to Railway. Here's a quick look at what this might look like in your package.json

```diff
...
  "scripts": {
-  "start": "vite"
+  "start": "npx http-server ./dist",
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
...
```

Once you've done that, we'll be good to go. Let's head over to [Railway](https://railway.app/)

## Connecting Railway with Your Online Git Repository

Railway allows us to make use of GitHub's continuous integration actions. When connecting Railway to your GitHub repo there's no further configuration needed, unless you would like to make use of environment variables and change build commands of the project. Railway is able to automatically detect commits to which ever branch you specified to make use of for deployment.

**Note:** We will be making use of GitHub as an example.

**Step 1:** Log into or sign up on Railway using your GitHub account. Railway is fairly easy to sign up to, as soon has you get to their [homepage](https://railway.app) click on `Start a New Project` and you should be navigated to the GitHub Connection page. The page should look something like this

<img
  src="/images/how-to-guides/deployment/railway-new-project.png"
  alt="railway new project creation"
/>

Once you select GitHub you will be redirected to GitHub to authorize Railway.

**Step 2:** After authorizing Railway to be installed in your repositories, you will be redirected back to the Railway website where you can select the repository containing your Solid project. The screen should look something like this

<img
  src="/images/how-to-guides/deployment/railway-select-project.png"
  alt="Project selection screen"
/>

Once you've selected the repository containing your Solid project you can click on the `Deploy Now` button or choose to add any environment variables your app might be making use of.

**Step 3:** Once you've done all that all that's left is to wait for the deployment to successfully build and deploy. If your deployment passes without any hiccups you should see a screen like this.

<img
  src="/images/how-to-guides/deployment/railway-deploy-success.png"
  alt="Successful deployment screen"
/>

As you may have noticed a domain will not be automatically assigned to your project after deployment. With Railway you'll have to go to the settings and manually generate a domain. Here's what that looks like

<img
  src="/images/how-to-guides/deployment/railway-generate-domain.png"
  alt="Generate domain"
/>

And voila, your new Solid project should be deployed at the generated domain and ready to go.

## Using The Railway CLI

**Step 1:** Install the Railway CLI using pnpm, yarn or npm

```bash
npm i -g @railway/cli
# or
pnpm i -g @railway/cli
# or
yarn global add @railway/cli
```

**Step 2:** Log into Railway using the Railway CLI
```bash
railway login
```

**Step 3:** You can choose to link your Solid local project to an already existing Railway project using `railway link` or you could choose to create a new Railway project using `railway init` and answer the command prompts that appear in the terminal.

**Step 4:** Once you've done that you can deploy your project to Railway using the following command

```bash
railway up
# or 
railway up --detach # if you don't want to see the logs outputted
```

And voila, your project is up and ready to go!

<Aside>
  {" "}
  For more information on how to make use of Railway to deploy your project, check
  out their <Link href="https://docs.railway.app" target="_blank">documentation website</Link>
</Aside>
