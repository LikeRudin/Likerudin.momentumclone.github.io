const TODOS_STATE_KEY = "todos";
const DONES_STATE_KEY = "dones";

const TODO_FORM_ID = "todoForm";
const TODO_INPUT_ID = "todoInput";

const TODO_LIST_ID = "todoList";
const DONE_LIST_ID = "doneList";

const TODOS_COPPY_BUTTON_ID = "todoBtn";
const DONES_COPPY_BUTTON_ID = "doneBtn";

const COPY_FORM_ID = "copyForm";
const COPY_TEXTAREA_ID = "story";

class LocalStorageAccesor {
  localStorage;
  static loadListDatas(key) {
    const listDatasObject = JSON.parse(localStorage.getItem(key)) || {};
    return listDatasObject;
  }

  static replaceListDatas(key, listDatas) {
    const listDatasString = JSON.stringify(listDatas);
    localStorage.setItem(key, listDatasString);
  }

  static saveListData(key, listData) {
    const listDatasObject = this.loadListDatas(key);
    listDatasObject[listData.key] = listData.text;
    this.replaceListDatas(key, listDatasObject);
  }

  static deleteListData(key, listDataKey) {
    const listDatasObject = this.loadListDatas(key);
    delete listDatasObject[listDataKey];
    this.replaceListDatas(key, listDatasObject);
  }
}

class ElementController {
  static connectHandler(elementId, eventName, handler) {
    const htmlElement = document.getElementById(elementId);
    htmlElement.addEventListener(eventName, handler);
  }

  static bringValue(elementId) {
    const htmlElement = document.getElementById(elementId);
    const value = htmlElement.value;
    htmlElement.value = "";
    return value;
  }

  static copyValue(elementId) {
    const htmlElement = document.getElementById(elementId);
    const value = htmlElement.value;
    return value;
  }

  static getChildren(elementId, childerenSelector) {
    const parentElement = document.getElementById(elementId);
    const children = [...parentElement.querySelectorAll(childerenSelector)];
    return children;
  }

  static getChildrenValues(elementId, childerenSelector) {
    const children = this.getChildren(elementId, childerenSelector);
    const values = children.map((child) => child.value);
    return values;
  }

  static getChildrenInnerTexts(elementId, childerenSelector) {
    const children = this.getChildren(elementId, childerenSelector);
    const innerTexts = children.map((child) => child.innerText);
    return innerTexts;
  }
}

class ListDataSubject {
  constructor(stateKeys) {
    this.registeredObservers = new Map();
    this.listDatasState = new Map();
    if (Array.isArray(stateKeys)) {
      stateKeys.forEach((stateKey) => this.loadListDataState(stateKey));
    }
  }

  loadListDataState(key) {
    console.log(`Subject Update States key: ${key}`);
    const listDatasObject = LocalStorageAccesor.loadListDatas(key);
    this.listDatasState.set(key, listDatasObject);
  }

  notifyChangesToObserver(key) {
    const targetObserver = this.registeredObservers.get(key);
    if (!targetObserver) {
      console.log("No Target");
      return;
    }
    const listDataState = this.listDatasState.get(key);
    console.log("notify states change to observer");
    console.log("state: ");
    console.log(listDataState);
    console.log("target observer:");
    console.log(targetObserver);
    targetObserver.update(listDataState);
  }

  handleStateUpdate(key) {
    console.log("Subject Update State datas");
    this.loadListDataState(key);
    this.notifyChangesToObserver(key);
  }

  deleteListData(key, listDataKey) {
    LocalStorageAccesor.deleteListData(key, listDataKey);
    this.handleStateUpdate(key);
  }

  updateListData(key, listKey, listText) {
    LocalStorageAccesor.saveListData(key, { key: listKey, text: listText });
    this.handleStateUpdate(key);
  }

  registerObserver(observer) {
    console.log("Subject registers Observer");
    console.log(`observer key: ${observer}`);
    console.log("observer ");
    console.log(observer);
    this.registeredObservers.set(observer.key, observer);
    this.notifyChangesToObserver(observer.key);
  }
  removeObserver(observer) {
    this.registeredObservers.delete(observer.key);
  }
}

/**
 * abstract class ListController
 *
 *
 * constructor() {
 *    this.list = createList()
 * }
 *
 * this.createList
 */

/**
 * abstract class List {
 * constructor(key, text){}
 *
 * create(){}
 * update(){}
 * delete(){}
 * }
 */

const createLiDomPainter = (stateKey) => {
  const paintDone = ({ key, value, subject, removeHandler }) => {
    const done = document.createElement("li");
    done.id = key;

    const textInput = document.createElement("input");
    textInput.value = value;

    //textInput.addEventListener(change)

    const deleteButton = document.createElement("button");

    deleteButton.innerText = "🗑";
    deleteButton.addEventListener("click", (event) => {
      const target = event.target.parentElement;
      const targetId = target.id;
      removeHandler(targetId);
    });

    done.appendChild(textInput);
    done.appendChild(deleteButton);
    return done;
  };

  const paintTodo = ({ key, value, subject, removeHandler }) => {
    const todo = document.createElement("li");
    todo.id = key;

    const textInput = document.createElement("input");
    textInput.value = value;

    const doneButton = document.createElement("button");
    doneButton.innerText = "✔";
    doneButton.addEventListener("click", (event) => {
      const target = event.target.parentElement;
      const targetId = target.id;
      removeHandler(targetId);
      subject.updateListData(DONES_STATE_KEY, targetId, value);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑";
    deleteButton.addEventListener("click", (event) => {
      const target = event.target.parentElement;
      const targetId = target.id;
      removeHandler(targetId);
    });

    todo.appendChild(textInput);
    todo.appendChild(doneButton);
    todo.appendChild(deleteButton);
    return todo;
  };

  switch (stateKey) {
    case TODOS_STATE_KEY:
      return paintTodo;
    case DONES_STATE_KEY:
      return paintDone;
  }
};

class LiDataObserver {
  constructor(stateKey, parentListId) {
    this.liDatas = new Map();
    this.key = stateKey;
    this.parentList = document.getElementById(parentListId);
    console.log("observer init");
    console.log(this.parentList);
    this.paintLi = createLiDomPainter(stateKey);
  }
  subscribe(subject) {
    this.subject = subject;
    this.subject.registerObserver(this);
  }

  unSubscribe() {
    this.subject.removeObserver(this);
    this.subject = null;
  }

  registerLiData(todo) {
    this.liDatas.set(todo);
  }

  createLiElement(key, value) {
    console.log("save todo to Observer state");
    this.liDatas.set(key, value);
    console.log("Observer update: Paint ListData");
    console.log(key);
    console.log(value);
    const removeHandler = (targetId) => {
      this.subject.deleteListData(this.key, targetId);
    };
    const li = this.paintLi({
      key,
      value,
      subject: this.subject,
      removeHandler,
    });
    this.parentList.appendChild(li);
  }

  removeLiElement(key) {
    console.log("Observer Update: remove todo");
    const target = document.getElementById(key);
    console.log(target);
    target.remove();
    this.liDatas.delete(key);
  }

  updateLiElement(key, value) {
    console.log("Observer Update: Update todo");
    const target = document.getElementById(key);
    target.value = value;
    this.liDatas.set(key, value);
  }

  update(listDataState) {
    console.log("Observer State Update Start!");

    const newLiDatas = new Map([...Object.entries(listDataState)]);
    const mergedLiDatas = new Map([...this.liDatas, ...newLiDatas]);

    [...mergedLiDatas.entries()].forEach(([liKey, liText]) => {
      console.log("check state");
      console.log(`key: ${liKey}, value: ${liText}`);

      !this.liDatas.has(liKey)
        ? this.createLiElement(liKey, liText)
        : !newLiDatas.has(liKey)
        ? this.removeLiElement(liKey)
        : this.updateLiElement(liKey, liText);
    });
  }
}
class ListData {
  constructor(text) {
    this.key = Date.now().toString();
    this.text = text;
  }
}

const bootStrap = () => {
  const todoStateKeys = [TODOS_STATE_KEY, DONES_STATE_KEY];

  const todoSubject = new ListDataSubject(todoStateKeys);

  const todoObserver = new LiDataObserver(TODOS_STATE_KEY, TODO_LIST_ID);
  todoObserver.subscribe(todoSubject);

  const doneObserver = new LiDataObserver(DONES_STATE_KEY, DONE_LIST_ID);
  doneObserver.subscribe(todoSubject);

  const handleListDataFormSubmit = function (event) {
    event.preventDefault();
    const todoText = ElementController.bringValue(TODO_INPUT_ID);
    const newListData = new ListData(todoText);
    LocalStorageAccesor.saveListData(TODOS_STATE_KEY, newListData);
    todoSubject.handleStateUpdate(TODOS_STATE_KEY);
  };

  ElementController.connectHandler(
    TODO_FORM_ID,
    "submit",
    handleListDataFormSubmit
  );

  const handleCopyFormSubmit = function (event) {
    event.preventDefault();

    const date = new Date();
    const todayDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;

    const clickedButton = event.submitter;
    const buttonId = clickedButton.id;

    const [copyTargetId, prefixText, buttonText] =
      buttonId === TODOS_COPPY_BUTTON_ID
        ? [TODO_LIST_ID, "[ ]", "Copy TODOs!"]
        : [DONE_LIST_ID, "[✔]", "Copy DONEs!"];

    const copiedList = ElementController.getChildrenValues(
      copyTargetId,
      "li > input"
    );
    const listTexts = copiedList
      .map((content) => `${prefixText} ${content}`)
      .join("\n");

    const copiedStory = ElementController.copyValue(COPY_TEXTAREA_ID);
    const dailyLog = `${todayDate} \n ${listTexts} ${copiedStory}`;

    navigator.clipboard
      .writeText(dailyLog)
      .then(() => {
        clickedButton.innerText = `Copied!`;
        setTimeout(() => {
          clickedButton.innerText = `${buttonText}`;
        }, 1500);
      })
      .catch((err) => {
        clickedButton.innerText = `failed.`;
        console.error(`failed to copy text ${err}`);
      });
  };

  ElementController.connectHandler(
    COPY_FORM_ID,
    "submit",
    handleCopyFormSubmit
  );
};

bootStrap();
