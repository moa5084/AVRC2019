
const questions = [
    {
        id: 'Entry',
        title: 'Name Entry',
        round: 'Info',
        type: 'form',
        leadSentence: '本大会で使用する名前を登録します。この名前は、成績発表において公開されることがあります。',
        instruction: 'Your Name',
        status: 'PL',
    },
    {
        id: 'TEntry',
        title: 'Team Entry',
        round: 'Info',
        type: 'form',
        leadSentence: '本大会で使用するチーム名を登録します。この名前は、成績発表において公開されることがあります。',
        instruction: 'Team Name',
        status: 'PL',
    },
    {
        id: 'A',
        title: '[A]',
        round: 'QR',
        type: 'question',
        img: 'https://juicy-apple.fun/av/AVRC2019/images/Final-2.png',
        status: 'PL',
    },
    {
        id: 'alpha',
        title: '[alpha]',
        round: 'SF',
        type: 'question',
        img: 'https://juicy-apple.fun/av/AVRC2019/images/Final-2.png',
        status: 'HD',
    },
]

export default questions;