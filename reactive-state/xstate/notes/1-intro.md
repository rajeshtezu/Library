# Introduction

**XState**: A library for working with a finite state machine and state charts.

**Official Docs** - https://xstate.js.org/docs/

## Finite State Machine

A machine which can be in only one state at a time.

> `Machine`: Mathematical model of computation

Parts of FSM (Finite State Machine)

1. Finite number of `states`
2. Finite number of `events`
3. `Initial state`
4. `Transition function`: determines the next state (given the current state and event)
5. `final states`: [possibly empty]

## Statecharts

Extension to state machine - A visual [description](https://www.sciencedirect.com/science/article/pii/0167642387900359/pdf) for Complex System.

<details>
  <summary>Some of the Extensions</summary>
  
  - Guarded transitions
  - Actions (entry, exit, transition)
  - Extended state (context)
  - Orthogonal (parallel) states
  - Hierarchical (nested) states
  - History

Link: [The World of Statecharts](https://statecharts.dev/)

</details>

## Actor Model

Another very old mathematical model of computation (goes well with state machines)

Everything is an **"actor"** that can do three things:

1. **Receive** messages
2. **Send** messages to other actors
3. <details>
     <summary><strong>Perfom Action</strong> (Behaviour)</summary>

   - change its local state
   - send messages to other actors
   - spawn new actors

   </details>

> An actor's behavior can be described by a state machine (or a statechart).

## Official Tutorials

- [Articles](https://xstate.js.org/docs/about/tutorials.html#articles)
- [Videos](https://xstate.js.org/docs/about/tutorials.html#videos)
