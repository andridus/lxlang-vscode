
import { workspace, ExtensionContext, window } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

const appname = "Lx - Elixir Language Server"
let client: LanguageClient;
let outputChannel;

export function activate(context: ExtensionContext) {
	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	outputChannel = window.createOutputChannel(appname);
  outputChannel.show();
	outputChannel.appendLine(`[${new Date().toISOString()}] Starting ${appname}...`);
	const compiler_path : string = workspace.getConfiguration().get('lxlang.compiler');
	const serverOptions: ServerOptions = {
		run: { command: compiler_path, transport: TransportKind.stdio },
		debug: { command: compiler_path, transport: TransportKind.stdio }
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'elixir' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'lxlang',
		appname,
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
	  outputChannel.appendLine(`[${new Date().toISOString()}] Lx - Elixir LSP activated...`);
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
