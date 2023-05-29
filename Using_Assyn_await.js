const puppeteer = require("puppeteer")
const answerobj = require("./code.js")

const username = "Your username"
const password = "Your password"


const loginUrl = "https://www.hackerrank.com/auth/login"

let page;



(async function hackerRank_auto() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        })

        const page = await browser.newPage()

        await page.goto(loginUrl)

        await page.type("input[id='input-1']", username)

        await page.type("input[id='input-2']", password)

        await page.click("button[data-analytics='LoginPassword']")

        await waitAndClick("div[data-automation='algorithms']", page)

        await timeout()

        await waitAndClick("input[value='warmup']", page)

        const questionsArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled")

        console.log(questionsArr.length)

        await questionSolver(page, questionsArr[0], answerobj.answer[0])

    }

    catch (error) {
        console.log(error)
    }
})()

function timeout() {
    return new Promise(function (resolve) {
        setTimeout(resolve, 3000)
    })
}

async function waitAndClick(selector, cpage) {

    await cpage.waitForSelector(selector)

    const click = await cpage.click(selector)

    return click
}

async function questionSolver(page, question, answer) {
    try {
        await question.click()
        await timeout()
        await waitAndClick(".checkbox-input", page)
        await page.type("[id='input-1']", answer, { delay: 10 })
        await page.keyboard.down("Control")
        await page.keyboard.press("A")
        await page.keyboard.press("X")
        await page.keyboard.up("Control")
        await waitAndClick(".monaco-editor.no-user-select.vs", page)
        await page.keyboard.down("Control")
        await page.keyboard.press("A")
        await page.keyboard.press("V")
        await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", page, { delay: 100 })
    }
    catch (error) {
        console.log(error)
    }
}