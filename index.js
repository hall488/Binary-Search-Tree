import { randArray } from "./mergs.js";
import Tree from "./tree.js";

let t = Tree(randArray(20));

console.log("Tree Balanced? " + t.isBalanced());
console.log(t.preorder(), t.postorder(), t.inorder());

randArray(20)
  .map((i) => (i += 10))
  .forEach((j) => t.insertNode(j));

t.prettyPrint();
console.log("Tree Balanced? " + t.isBalanced());

t.rebalance();
t.prettyPrint();

console.log("Tree Balanced? " + t.isBalanced());

console.log(t.preorder(), t.postorder(), t.inorder());

for (;;);
