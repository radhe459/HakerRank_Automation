const puppeteer = require("puppeteer")
const answerobj = require("./code.js")

const username = "Your username"
const password = "Your password"


const loginUrl = "https://www.hackerrank.com/auth/login"
let page;
let browserOpen = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})

browserOpen.then(function (browser) {
    let newtabPromise = browser.newPage()
    return newtabPromise
}).then(function (newTab) {
    page = newTab
    let hackerrankLogin = page.goto(loginUrl)
    return hackerrankLogin
}).then(function () {
    const waitForSelector = page.waitForSelector("input[id='input-1']", { visible: true })
    return waitForSelector
}).then(function () {
    const usernamePromise = page.type("input[id='input-1']", username, { delay: 50 })
    return usernamePromise
}).then(function () {
    const waitForSelector = page.waitForSelector("input[id='input-2']", { visible: true })
    return waitForSelector
}).then(function () {
    const passwordPromise = page.type("input[id='input-2']", password)
    return passwordPromise
}).then(function () {
    const waitForSelector = page.waitForSelector("button[data-analytics='LoginPassword']", { visible: true })
    return waitForSelector
}).then(function () {
    // const loginPromise = page.evaluate(() => {
    //     document.querySelector("button[data-cy='sign-in-btn']").click()
    // })
    const loginPromise = page.click("button[data-analytics='LoginPassword']")
    return loginPromise;
}).then(function () {
    const algoClickPromis = waitAndClick("div[data-automation='algorithms']", page)
    return algoClickPromis
}).then(function () {
    let waitFor = page.waitForTimeout(3000)
    return waitFor
}).then(function () {
    const warmupPromise = waitAndClick("input[value='warmup']", page)
    return warmupPromise
}).then(function () {
    const waitFor = page.waitForTimeout(3000)
    return waitFor
}).then(function () {
    const allproblems = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled")
    return allproblems
}).then(function (questionsArr) {
    console.log(questionsArr.length)
    let questionsolve = questionsolver(page, questionsArr[0], answerobj.answer[0]);
    return questionsolve
})


function waitAndClick(selector, page) {
    return new Promise(function (resolve, reject) {
        console.log(selector)
        let waitForModel = page.waitForSelector(selector)
        console.log("done")
        waitForModel.then(function () {
            let clickModel = page.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}

function questionsolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        const questionwillClliked = question.click()
        questionwillClliked.then(function () {
            let waitFor = page.waitForTimeout(2000)
            return waitFor
        }).then(function () {
            let checkboxClickPromise = waitAndClick(".checkbox-input", page)
            return checkboxClickPromise
        }).then(function () {
            let waitforTextarea = page.waitForSelector("[id='input-1']")
            return waitforTextarea
        }).then(function () {
            return page.type("[id='input-1']", answer, { delay: 10 })
        }).then(function () {
            const cntrlClick = page.keyboard.down("Control")
            return cntrlClick;
        }).then(function () {
            const AclickPromise = page.keyboard.down("A", { delay: 100 })
            return AclickPromise;
        }).then(function () {
            const XclickPromise = page.keyboard.down("X", { delay: 100 })
            return XclickPromise
        }).then(function () {
            const cntrlRelease = page.keyboard.up("Control")
            return cntrlRelease
        }).then(function () {
            let EditorclickPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return EditorclickPromise
        }).then(function () {
            const cntrlClick = page.keyboard.down("Control")
            return cntrlClick;
        }).then(function () {
            const AclickPromise = page.keyboard.down("A", { delay: 100 })
            return AclickPromise;
        }).then(function () {
            const VclickPromise = page.keyboard.down("V", { delay: 100 })
            return VclickPromise
        }).then(function () {
            const cntrlRelease = page.keyboard.up("Control")
            return cntrlRelease
        }).then(function () {
            const submitClick = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", page, { delay: 100 })
            return submitClick
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}