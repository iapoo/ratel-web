# umi-electron-typescript-template
base template include umijs electron typescript


# NPM Config

registry=https://registry.npm.taobao.org/
chromedriver_cdnurl=https://mirrors.huaweicloud.com/chromedriver
electron_mirror=https://mirrors.huaweicloud.com/electron/
electron_builder_binaries_mirror=https://mirrors.huaweicloud.com/electron-builder-binaries/


# Icon maker

npm run svgr --replace-attr-values "#3771c8=currentColor" src/components/Resource/Icons/Source/rectangle.svg 
npm run svgr --replace-attr-values src/components/Resource/Icons/Source/rectangle.svg 