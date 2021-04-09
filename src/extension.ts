// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { queryNewMessage } from './query';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "commit-msg-picker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('commit-msg-picker.nextMessage', () => {
		queryNewMessage().then((res: any) => {
			vscode.window.showInformationMessage(`Your commit message: ${res}`);
		});
	});

	// create a new status bar item that we can now manage
	let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = "commit-msg-picker.nextMessage";
	statusBarItem.text = "$(megaphone) WhatTheCommit";
	statusBarItem.tooltip = "Create the random message for your next commit!";
	statusBarItem.show();
	
	context.subscriptions.push(statusBarItem);
	context.subscriptions.push(disposable);

	// register some listener that make sure the status bar 
	// item always up-to-date
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => statusBarItem.show()));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(() => statusBarItem.show()));
}

// this method is called when your extension is deactivated
export function deactivate() { }
