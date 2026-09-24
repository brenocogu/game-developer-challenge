O jogo segue o padrão MVU (Model-View-Update), desacoplando a lógica com a rendereziação do jogo:

A lógica do jogo vive dentro de `Models`
- `World/WorldModel.ts` é o responsável pelo estado atual do jogo: inimigos, balas, niveis, posições, jogador, etc... Ele é atualizado pelos `Systems` e consumido pelo `React/PixiJS` para render e UI
- `World/Systems/` contém todas as classes agnósticas responsáveis pelas ações do jogo durante a partida. Movimentação, colisão, inimigos, tiros, etc..: tudo vive nessa camada a parte do render e UI, completamente testável mesmo sem framework de render.

o `WorldModel` tem propriedades para:
- `InputState` - objeto que explicita quais comandos estão ativos no frame naquele momento (mais detalhes em `Input`)
- `GameState` - objeto que contém a informação de tudo que existe no mundo de jogo, não apenas na tela; Inimigos, balas-de-canhão, o peão do jogador -> tudo vive dentro do GameState

Já no fluxo de telas e interface, temos a pasta `UI/` contendo as telas de interface e navegação, as telas de HUD e o `GameStage`, responsável pelo elo entre o `WorldModel` e nosso render:

- O `entrypoint` do jogo é inicializado via React com `new WorldModel`.
- `WorldModel` recebe a função de tick do render no `GameStage`, nesse caso via react hook `useTick()` do PixiJS
- `WorldModel` propaga o `tick`para os `Systems`, enviando a informação de `deltaTime`.



A renderização e carregamento dos assets vive dentro de `src/Views`, contém todas os componentes de PixiJS usados para o render do jogo.

Uma importante decisão de manter os sistemas desacoplados é que as responsabilidades dos mesmos estão ordenadas e centralizadas. Um Exemplo é todo o ciclo de vida da `Bullet`, onde a colisão ou out-of-bounds não mexe diretamente com o conteúdo da array, mas sim via `filter` sempre antes de qualquer outro cálculo, evitando alterações na coleção enquanto acontece uma operação

Em cada pasta de UI que existe a substa 'Generic/', é possível encontrar componentes agnósticos da tela qe podem ser reutilizados no sistema.

----
## Controles
- A/D - virar o barquinho
- W - Avançar
- Space - atirar
- Q/E - atirar para esquerda/direita (respectivamente)