const express = require('express');
const router = express.Router();
const cloudbase = require('@cloudbase/node-sdk')

const cloudDb = cloudbase.init({
  env: 'robin-4g8t276zfdd0395e',
  secretId: 'AKIDzwpX8VeZFhvufDajdhX9WfbJ9l9IDwLW',
  secretKey: 'zmMiqjXQOCpIXYKcsAMUQ9evyoPmxufB'
})

// 1. 获取数据库引用
var db = cloudDb.database();

// 获取任务
router.get('/', async (req, res) => {
  // 2. 构造查询语句
  const result = await db
    // collection() 方法获取一个集合的引用
    .collection("todo")
    // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
    // .where({
    //   name: "The Catcher in the Rye"
    // })
    // get() 方法会触发网络请求，往数据库取数据
    .get()
  res.json(result);
});

// 添加任务
router.post('/', async (req, res) => {
  const title = req.body.title;
  if(!title) return
  const todo = {
    title,
    createTime: Date.now(),
    done: false,
  }

  const result = await db
    .collection('todo')
    .add(todo);

  res.json(result);
});

// 修改任务
router.put('/', async (req, res) => {
  const done = req.body.done;
  const id = req.body.id;
  if(!done || !id) return
  const todo = {
    title: req.body.title,
    done,
  }

  const result = await db
    .collection('todo')
    .doc(id)
    .update(todo);

  res.json(result);
});

// 删除任务
router.delete('/', async (req, res) => {
  const id = req.body.id;
  if(!id) return

  const result = await db
    .collection('todo')
    .doc(id)
    .delete();

  res.json(result);
});

module.exports = router;