const fs = require('fs');
const chalk = require("chalk");
const ora = require("ora");
const download = require("download-git-repo");
const path = require('path')
const { okColor, errColor } = require('./config')

// 创建项目前校验是否已存在
function checkName(projectName) {
    return new Promise((resolve, reject) => {
        fs.readdir(process.cwd(), (err, data) => {
            if (err) {
                return reject(err);
            }
            if (data.includes(projectName)) {
                return reject(new Error(`${projectName} already exists!`));
            }
            resolve();
        });
    });
}

function downloadTemplate(gitUrl, projectName) {
    const spinner = ora("download template......").start();
    return new Promise((resolve, reject) => {
        try {
            download(
                gitUrl,
                path.resolve(process.cwd(), projectName),
                { clone: true },
                function (err) {
                    if (err) {
                        spinner.fail(); // 下载失败提示
                        return reject(err);
                    }
                    spinner.succeed(); // 下载成功提示
                    resolve();
                }
            );
        } catch (error) {
            console.log(chalk.hex(errColor)(error));
            return spinner.fail();
        }
    });
}

async function changeTemplate(customContent) {
    // name description author
    const { projectName = "", description = "", author = "" } = customContent;
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve(process.cwd(), projectName, "package.json"),
            "utf8",
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                let packageContent = JSON.parse(data);
                packageContent.name = projectName;
                packageContent.author = author;
                packageContent.description = description;
                fs.writeFile(
                    path.resolve(process.cwd(), projectName, "package.json"),
                    JSON.stringify(packageContent, null, 2),
                    "utf8",
                    (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    }
                );
            }
        );
    });
}

module.exports = {
    initTemplateDefault: async (customContent, gitUrl) => {
        console.log(
            chalk.bold.cyan("CosenCli: ") + "will creating a new project starter"
        );
        const { projectName = "" } = customContent;

        try {
            await checkName(projectName);
            await downloadTemplate(gitUrl, projectName);
            await changeTemplate(customContent);

            console.log(chalk.green("ok:template download completed"));
            console.log(
                chalk.bold.cyan("CosenCli: ") + "a new project starter is created"
            );
        } catch (error) {
            console.log(chalk.hex(errColor)(error));
        }
    }
}