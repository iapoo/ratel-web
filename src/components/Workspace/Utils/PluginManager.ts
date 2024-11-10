import { Plugin } from '@ratel-web/editor/Items'
import * as ClipboardPlugin from '@ratel-web/plugin-entity-clipboard'

export class PluginManager {
  private static internalPlugins: Map<string, Plugin> = new Map<string, Plugin>()
  private static externalPlugins: Map<string, Plugin> = new Map<string, Plugin>()
  private static initialized = false
  public static loadPlugins() {
    PluginManager.loadInternalPlugins()
    PluginManager.loadExternalPlugins()
  }

  public static get plugins() {
    if (!PluginManager.initialized) {
      PluginManager.loadInternalPlugins()
      PluginManager.initialized = true
    }
    return PluginManager.internalPlugins
  }

  public static loadInternalPlugins() {
    const clipboardPlugin = ClipboardPlugin.loadPlugin()
    PluginManager.internalPlugins.set(clipboardPlugin.name, clipboardPlugin)
    console.log(`Plugin: ${clipboardPlugin.name} is loaded`)
  }

  public static loadExternalPlugins() {
    const clipboardPlugin = ClipboardPlugin.loadPlugin()
    PluginManager.externalPlugins.set(clipboardPlugin.name, clipboardPlugin)
    console.log(`Plugin: ${clipboardPlugin.name} is loaded`)
  }
}
