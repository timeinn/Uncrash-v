/* eslint-disable */
const ASCIILogo = `
██╗   ██╗███╗   ██╗ ██████╗██████╗  █████╗ ███████╗██╗  ██╗
██║   ██║████╗  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
██║   ██║██╔██╗ ██║██║     ██████╔╝███████║███████╗███████║
██║   ██║██║╚██╗██║██║     ██╔══██╗██╔══██║╚════██║██╔══██║
╚██████╔╝██║ ╚████║╚██████╗██║  ██║██║  ██║███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
Published: \t\t\t\t${UNCRASH_VERSION}-${GIT_HASH} @uncrash.net
BuildDate: \t\t\t\t${BUILD_DATE}
`
export default () => {
    // console.clear()
    console.info(`%c${ASCIILogo}\r\n%cFast website and server uptime monitoring.\r\nMade with ❤ by Sendya, Acris`, "color: #fc4d50", "color: #000; font-size: 14px;    font-family: Hiragino Sans GB,Microsoft YaHei,\\\\5FAE\\8F6F\\96C5\\9ED1,Droid Sans Fallback,Source Sans,Wenquanyi Micro Hei,WenQuanYi Micro Hei Mono,WenQuanYi Zen Hei,Apple LiGothic Medium,SimHei,ST Heiti,WenQuanYi Zen Hei Sharp,sans-serif;")
}
