import fs from 'fs';
import { spawn } from 'child_process';
import inquirer from 'inquirer';


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
}

createNewFile();
