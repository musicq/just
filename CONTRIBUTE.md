# Contribute

Clone the repo to your local.

```shell
git clone https://github.com/musicq/just.git
```

Install the dependencies.

```shell
npm install
```

Start to compile the code.

```shell
npm run dev
```

We need to link the package to global so that we can test it. Make sure you run
the command under the root of `just` project

```shell
npm link
```

After `link`, we could test it like we installed it.

```shell
just
```

(Optional) you can unlink the tool after you finish the development.

```shell
npm unlink
```
