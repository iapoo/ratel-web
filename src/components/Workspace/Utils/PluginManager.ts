import { ExtensionCategory, Plugin } from '@ratel-web/editor/Items'
import { EntityExtension } from '@ratel-web/editor/Shapes'
import * as ClipboardPlugin from '@ratel-web/plugin-entity-clipboard'

interface ExtensionCategoryMap {
  name: string
  category: ExtensionCategory
  data: Map<string, EntityExtension>
}

interface PluginMap {
  name: string
  plugin: Plugin
  data: Map<string, ExtensionCategoryMap>
}

export class PluginManager {
  private static internalPlugins: Map<string, PluginMap> = new Map<string, PluginMap>()
  private static externalPlugins: Map<string, PluginMap> = new Map<string, PluginMap>()
  private static _plugins: Map<string, Plugin> = new Map<string, Plugin>()
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
    return PluginManager._plugins
  }

  public static findPlugin(pluginName: string) {
    if (!PluginManager.initialized) {
      PluginManager.loadInternalPlugins()
      PluginManager.initialized = true
    }
    const pluginMap = PluginManager.internalPlugins.get(pluginName)
    if (pluginMap) {
      return pluginMap.plugin
    }
    return undefined
  }

  public static findExtension(pluginName: string, extensionCategoryName: string, extensionName: string) {
    if (!PluginManager.initialized) {
      PluginManager.loadInternalPlugins()
      PluginManager.initialized = true
    }
    const pluginMap = PluginManager.internalPlugins.get(pluginName)
    if (pluginMap) {
      const extensionCategoryMap = pluginMap.data.get(extensionCategoryName)
      if (extensionCategoryMap) {
        return extensionCategoryMap.data.get(extensionName)
      }
    }
    return undefined
  }

  public static findExtensionCategory(pluginName: string, extensionCategoryName: string) {
    if (!PluginManager.initialized) {
      PluginManager.loadInternalPlugins()
      PluginManager.initialized = true
    }
    const pluginMap = PluginManager.internalPlugins.get(pluginName)
    if (pluginMap) {
      const extensionCategoryMap = pluginMap.data.get(extensionCategoryName)
      if (extensionCategoryMap) {
        return extensionCategoryMap.category
      }
    }
    return undefined
  }

  public static loadInternalPlugins() {
    const clipboardPlugin = ClipboardPlugin.loadPlugin()
    PluginManager._plugins.set(clipboardPlugin.name, clipboardPlugin)
    const clipboardPluginMap: PluginMap = {
      name: clipboardPlugin.name,
      plugin: clipboardPlugin,
      data: new Map<string, ExtensionCategoryMap>(),
    }

    PluginManager.internalPlugins.set(clipboardPlugin.name, clipboardPluginMap)
    clipboardPlugin.categories.forEach((category) => {
      const categoryMap: ExtensionCategoryMap = {
        name: category.name,
        category: category,
        data: new Map<string, EntityExtension>(),
      }
      clipboardPluginMap.data.set(category.name, categoryMap)
      category.extensions.forEach((extension) => {
        categoryMap.data.set(extension.name, extension)
      })
    })
    console.log(`Plugin: ${clipboardPlugin.name} is loaded`)
  }

  public static loadExternalPlugins() {
    PluginManager.loadInternalPlugins()
  }
}
