import * as elements from 'typed-html';
import { Button } from '../todos/components/TodoForm';

export const Counter = () => (
<div x-data="{ count: 0 }">
    <button x-on:click="count++">Increment</button>
    <span x-text="count"></span>
    <button x-on:click="count--">Decrement</button>

    <Button
      hx-delete={`/todos/count`}
      hx-swap={"outerHTML"}
    >
      Ronaldo
    </Button>    
</div>
)

export const Toggle = ({children}: elements.Children) => (`
<div x-data="{ open: false }">
    <button class="border border-red-200" @click="open = ! open">Expand</button>
 
    <div x-show="open">
        Content...
        ${<ToggleContent />}
    </div>
</div>
`)

const ToggleContent = () => (

    <div class={"border border-red-200 "}>
        <p>Content</p>
    </div>
)
