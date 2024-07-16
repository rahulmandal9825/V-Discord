import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';


export const remdomAvatar = (seed:string) =>{

    const avatar = createAvatar(adventurer, {
  "seed": `${seed}`
});

const svg = avatar.toString();
console.log(svg)

return svg
}
