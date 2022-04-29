const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor () {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data);

    function addWithin(node, data) {
      if(!node) return new Node(data);

      if(node.data === data) return node;

      if(node.data > data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this._root, data);

    function searchWithin(node, data) {
      if(!node) return false;
      if(node.data === data) return true;

      if(node.data > data) {
        return searchWithin(node.left, data);
      } else {
        return searchWithin(node.right, data);
      }
    }
  }

  find(data) {
    return findWithin(this._root, data);

    function findWithin(node, data) {
      if(!node) return null;
      if(node.data === data) return node;

      if(node.data > data) {
        return findWithin(node.left, data);
      } else {
        return findWithin(node.right, data);
      }
    }
  }

  remove(data) {
    return removeData(this._root, data);

    function removeData(node, data) {
      if(!node) return null;

      if(node.data > data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if(node.left === null && node.right === null) {
          node = null;
        } else if (node.left === null) {
          node = node.right;
        } else if (node.right === null) {
          node = node.left;
        } else {
          let current = node.right;
          
          while(current.left) {
            current = current.left;
          }

          node.data = current.data;

          node.right = removeData(node.right, current.data);
        }

        return node;
      }
    }
  }

  min() {
    let current = this._root;
    if(!current.left) return current.data; 

    while(current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    let current = this._root;
    if(!current.right) return current.data; 

    while(current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};