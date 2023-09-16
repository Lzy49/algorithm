function createNode(value = 0, top = null) {
  return {
    value,
    top,
    left: null,
    right: null
  }
}

let tree = createNode('x')
function addArray() {
  [30, 16, 50, 13, 18, 15, 17, 25, 19, 27, 34, 58, 51, 66, 55].forEach(item => {
    add(item)
  })
  log(tree.left)
}
addArray()
// 添加节点
function add(value) {
  if (tree.value === 'x' && tree.left == null) {
    tree.left = createNode(value, null)
  } else {
    addItem(value, tree.left)
  }
}
// 添加节点递归
function addItem(value, tree) {
  // 大于值就往右放
  if (tree.value < value) {
    if (tree.right) {
      addItem(value, tree.right)
    } else {
      tree.right = createNode(value, tree)
    }
  }
  // 小于值就往左放
  if (tree.value > value) {
    if (tree.left) {
      addItem(value, tree.left)
    } else {
      tree.left = createNode(value, tree)
    }
  }
}
// 打印内容
function log(arr) {
  if (arr !== null) {
    log(arr.left)
    console.log(arr.value)
    log(arr.right)
  }
}
function testDEL(value) {
  const arr = find(value)
  log(tree.left)
  if (arr.left === null && arr.right === null) {
    if (arr.top.left?.value === value) {
      arr.top.left = null
    } else {
      arr.top.right = null
    }
  } else if (arr.left === null || arr.right === null) {
    const item = arr.left || arr.right
    item.top = arr.top;
    // 有1个子节点
    if (arr.top.left?.value === value) {
      arr.top.left = item
    } else {
      arr.top.right = item
    }
  } else if (arr.left !== null && arr.right !== null) {
    // 寻找右1的最小节点
    let min = findMin(arr.right)
    // arr = min
    testDEL(min.value) // 删掉它
    // 处理父级
    min.top = arr.top;
    if (arr.top.left.value === arr.value) {
      arr.top.left = min
    } else {
      arr.top.right = min
    }
    // 处理子级
    min.left = arr.left;
    arr.left.top = min

    min.right = arr.right
    arr.right.top = min

  }
}
function testFind(value) {
  const item = find(value)
  console.log(item)
}
// 查询节点
function find(value, arr = tree.left) {
  if (arr.value === value) {
    return arr
    // 没有子节点
  } else {
    if (arr.value > value) {
      return find(value, arr.left)
    } else if (arr.value < value) {
      return find(value, arr.right)
    }
  }
}
function findMin(item) {
  while (item.left !== null) {
    item = item.left
  }
  return item
}