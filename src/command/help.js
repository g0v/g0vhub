export default async function () {
  return `
\`help\` 使用說明
\`in <project name / task>\` 進入某個坑裡，datetime 為預計何時出坑，預設 24 hr 後出坑
\`out\` 離開某個坑
\`all\` 查詢有哪些 g0ver 正在哪些坑
\`add <skill name>\` 新增技能
\`del <skill name>\` 刪除技能
\`whoami\` 查詢自己有哪些技能
\`search <skill name>\` 搜尋哪些 g0ver 會此技能
\`whois <slack id>\` 查詢此 g0ver 有哪些技能
  `;
}
