import TreeNode from "./treenode.js";
import { mergeSort } from "./mergs.js";

const Tree = (array) => {
  let root;

  const buildTree = (start = 0, end = array.length - 1) => {
    let mid = Math.floor((start + end) / 2);

    let node = TreeNode(array[mid]);

    if (start > end) {
      return null;
    } else {
      node.setLeft(buildTree(start, mid - 1));
      node.setRight(buildTree(mid + 1, end));
    }

    return node;
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.getRight() !== null) {
      prettyPrint(
        node.getRight(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
    if (node.getLeft() !== null) {
      prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insertNode = (value) => {
    let testNode = root;

    for (;;) {
      if (value > testNode.getValue()) {
        if (testNode.getRight() == null) {
          testNode.setRight(TreeNode(value));
          break;
        }
        testNode = testNode.getRight();
      } else if (value < testNode.getValue()) {
        if (testNode.getLeft() == null) {
          testNode.setLeft(TreeNode(value));
          break;
        }
        testNode = testNode.getLeft();
      } else {
        break;
      }
    }
  };

  const deleteNode = (value) => {
    let parent;

    try {
      parent = find(value, true);
    } catch {
      find(value, false);
      parent = TreeNode(null);
      parent.setLeft(root);
    }

    let node;
    let directions = { left: true, right: false };
    let directionFlag;

    if (parent.getLeft() != null && parent.getLeft().getValue() == value) {
      node = parent.getLeft();
      directionFlag = directions.left;
    } else {
      node = parent.getRight();
      directionFlag = directions.right;
    }

    let left = node.getLeft();
    let right = node.getRight();

    if (left == null && right == null) {
      if (directionFlag == directions.left) {
        parent.setLeft(null);
      } else {
        parent.setRight(null);
      }
      return;
    }

    if (left == null) {
      if (directionFlag == directions.left) {
        parent.setLeft(node.getRight());
      } else {
        parent.setRight(node.getRight());
      }
      return;
    }

    if (right == null) {
      if (directionFlag == directions.left) {
        parent.setLeft(node.getLeft());
      } else {
        parent.setRight(node.getLeft());
      }
      return;
    }
    let clNode = closestLargerNode(node);

    let clParent = find(clNode.getValue(), true);

    if (parent.getValue() == null) {
      root = clNode;
    } else {
      if (directionFlag == directions.left) {
        parent.setLeft(clNode);
      } else {
        parent.setRight(clNode);
      }
    }

    if (clNode.getValue() == node.getRight().getValue()) {
      clNode.setLeft(node.getLeft());
      return;
    }

    clParent.setLeft(clNode.getRight());

    clNode.setRight(node.getRight());
    clNode.setLeft(node.getLeft());
  };

  const closestLargerNode = (node, firstpass = true) => {
    if (firstpass) {
      if (node.getRight() == null)
        throw new Error("Node is largest value in tree");
      return closestLargerNode(node.getRight(), false);
    }

    return node.getLeft() == null
      ? node
      : closestLargerNode(node.getLeft(), false);
  };

  const find = (value, parentFlag = false) => {
    let testNode = root;
    let parentNode;

    if (root.getValue() == value && parentFlag) {
      throw new Error("First node does not have parent");
    }

    for (;;) {
      if (testNode.getValue() == value) {
        break;
      } else if (testNode.getRight() != null && testNode.getValue() < value) {
        parentNode = testNode;
        testNode = testNode.getRight();
      } else if (testNode.getLeft() != null && testNode.getValue() > value) {
        parentNode = testNode;
        testNode = testNode.getLeft();
      } else {
        throw new Error("Value not in tree!");
      }
    }

    return parentFlag ? parentNode : testNode;
  };

  const levelOrder = (cb) => {
    let queue = [];
    let array = [];

    queue.push(root);

    while (queue.length != 0) {
      let arg = queue[0];
      cb ? cb(arg) : array.push(arg.getValue());
      if (arg.getLeft()) queue.push(arg.getLeft());
      if (arg.getRight()) queue.push(arg.getRight());
      queue.shift();
    }

    return !cb ? array : "";
  };

  const inorder = (node = root, cb, array = []) => {
    if (node === null) {
      return;
    }

    inorder(node.getLeft(), cb, array);

    !cb ? array.push(node.getValue()) : cb(node);

    inorder(node.getRight(), cb, array);

    return !cb ? array : "";
  };

  const preorder = (node = root, cb, array = []) => {
    if (node === null) {
      return;
    }

    !cb ? array.push(node.getValue()) : cb(node);

    inorder(node.getLeft(), cb, array);

    inorder(node.getRight(), cb, array);

    return !cb ? array : "";
  };

  const postorder = (node = root, cb, array = []) => {
    if (node === null) {
      return;
    }

    inorder(node.getLeft(), cb, array);

    inorder(node.getRight(), cb, array);

    !cb ? array.push(node.getValue()) : cb(node);

    return !cb ? array : "";
  };

  const height = (node) => {
    if (node === null) return -1;

    let leftCount = 1 + height(node.getLeft());
    let rightCount = 1 + height(node.getRight());

    return leftCount > rightCount ? leftCount : rightCount;
  };

  const depth = (node, r = root, depthVal = 0) => {
    if (node === null) return;

    if (node.getValue() == r.getValue()) {
      return depthVal;
    } else if (node.getValue() > r.getValue()) {
      return depth(node, r.getRight(), depthVal + 1);
    } else {
      return depth(node, r.getLeft(), depthVal + 1);
    }
  };

  const isBalanced = (node = root) => {
    if (node === null) return true;

    let leftHeight = 0;
    let rightHeight = 0;

    if (node.getLeft() != null) {
      leftHeight = height(node.getLeft());
    }

    if (node.getRight() != null) {
      rightHeight = height(node.getRight());
    }

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return isBalanced(node.getLeft()) && isBalanced(node.getRight());
  };

  const rebalance = () => {
    array = inorder();
    root = buildTree();
  };

  array = mergeSort(array);
  root = buildTree();
  prettyPrint(root);

  return {
    rebalance,
    isBalanced,
    depth,
    height,
    postorder,
    preorder,
    inorder,
    levelOrder,
    deleteNode,
    find,
    insertNode,
    prettyPrint,
  };
};

export default Tree;
