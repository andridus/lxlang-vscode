"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const appname = "Lx - Elixir Language Server";
let client;
let outputChannel;
function activate(context) {
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    outputChannel = vscode_1.window.createOutputChannel(appname);
    outputChannel.show();
    outputChannel.appendLine(`[${new Date().toISOString()}] Starting ${appname}...`);
    const compiler_path = vscode_1.workspace.getConfiguration().get('lxlang.compiler');
    const serverOptions = {
        run: { command: compiler_path, transport: node_1.TransportKind.stdio },
        debug: { command: compiler_path, transport: node_1.TransportKind.stdio }
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'elixir' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient('lxlang', appname, serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();
    outputChannel.appendLine(`[${new Date().toISOString()}] Lx - Elixir LSP activated...`);
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
//# sourceMappingURL=extension.js.map