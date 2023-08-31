const TreeNode = (value) => {
  let left = null;
  let right = null;

  const getValue = () => value;
  const setValue = (v) => {
    value = v;
  };

  const getLeft = () => left;
  const setLeft = (l) => {
    left = l;
  };

  const getRight = () => right;
  const setRight = (r) => {
    right = r;
  };

  return { getValue, setValue, getLeft, setLeft, getRight, setRight };
};

export default TreeNode;
