#!/usr/bin/env node

import fs from 'fs';
import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { search, Separator } from '@inquirer/prompts';
import chalk from 'chalk';


function createNewFile() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'filename',
                message: 'Enter the name for your new file:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a valid filename.';
                    }
                }
            }
        ])
        .then(answers => {
            const { filename } = answers;


            //Create the file
            fs.writeFile(filename, '', (err) => {
                if (err) {
                    console.error('Error creating file:', err)
                    return;
                }
                console.log(`File '${filename}' created successfully.`);

                // Open the file with Vim
                const vim = spawn('vim', [filename], { stdio: 'inherit' });
            });

        })
        .catch(error => {
            console.error(error);
        });
};


async function openFile() {
    const __filenameNew = fileURLToPath(import.meta.url)
    const __dirnameNew = path.dirname(__filenameNew)
    const files = fs.readdirSync(__dirnameNew);

    const answer = await search({
        message: 'Choose a file',
        source: (term) => files,
    });
    const vim = spawn('vim', [answer], { stdio: 'inherit' });

}

inquirer
    .prompt([
        {
            type: 'list',
            name: "menu",
            message: chalk.magenta("What are we doing today? :3"),
            choices: ['Create New File', 'Open File'],
        }
    ])
    .then(answers => {
        if (answers.menu === "Create New File") {
            createNewFile();
        } else if (answers.menu === "Open File") {
            openFile();
        }
    })
    .catch(error => {
        console.error(error);
    });
