// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let output = vscode.window.createOutputChannel("translation");
	let disposable = vscode.commands.registerCommand('extension.yd', () => {
		let editor = vscode.window.activeTextEditor;
		let text = editor?.document.getText(editor?.selection);
		if (text) {
			translation(text, output);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function translation(text: string, output: vscode.OutputChannel) {
	output.clear()
	const { spawn } = require('child_process');
	const child = spawn('yd', [text]);
	child.stdout.on('data', (data: string) => {
		output.append(data.toString());
		output.show();
	});
	// child.stderr.pipe(dest);
	child.stderr.on('data', function (data: string) {
		output.append(data.toString());
	});

	child.on('close', (code: string) => {
		output.append(`child process exited with code ${code}`);
	});
	return "";
}