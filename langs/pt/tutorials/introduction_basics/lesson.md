# Introdução

Este guia interativo o guiará através das principais funcionalidades do Solid. Você também pode consultar a API e os guias para saber mais sobre como o Solid funciona.

Você também pode conferir nosso novo tutorial para iniciantes (trabalho-em-andamento!) [aqui](https://docs.solidjs.com/guides/tutorials/getting-started-with-solid/).

# O que é Solid?

Solid é um framework JavaScript para a criação de aplicações web interativas.
Com Solid, você pode usar seu conhecimento existente de HTML e JavaScript para construir componentes que podem ser reutilizados em todo o seu aplicativo.
Solid disponibiliza ferramentas para melhorar seus componentes com _reatividade_: código JavaScript declarativo que liga a interface do usuário com os dados que ele usa e cria.

# Anatomia de uma aplicação Solid

Uma aplicação Solid é composta de funções que chamamos de componentes. Dê uma olhada na função `HelloWorld` à direita: ela retorna diretamente uma `div`! Esta mistura de HTML e JavaScript é chamada JSX. Solid vem com um compilador que posteriormente transforma estas tags em nós DOM.

JSX permite que você utilize a maioria dos elementos HTML em nossa aplicação, mas também permite que você crie novos elementos. Uma vez que tenhamos declarado nossa função `HelloWorld`, podemos usá-la como uma tag `<HelloWorld>` por toda a nossa aplicação.

O ponto de entrada para qualquer aplicação Solid é a função de `render`. São necessários 2 argumentos, uma função que envolve nosso código de aplicação e um elemento existente no HTML para ser montado:

```jsx
render(() => <HelloWorld />, document.getElementById("app"));
```

# Alavancando este Tutorial

Cada lição do tutorial apresenta uma funcionalidade do Solid e um cenário para experimentá-la. A qualquer momento você pode clicar no botão Resolver para ver a solução ou clicar em Reiniciar para começar de novo. O próprio editor de código possui um console e uma aba de saída onde você pode ver a saída compilada gerada a partir de seu código. Olhe para ele se você estiver curioso para ver como o Solid gera o código.

Divirta-se!
