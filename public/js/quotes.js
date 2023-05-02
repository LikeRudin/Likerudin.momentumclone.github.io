const quotes = [
    {
        quote: `어떤 사람들은 2조 2천억이 말도 안되는 숫자라고 생각하지만,
                        지구에는 약 3조그루의 나무가 있다.
        
                        2조 2천억은 그에 한참 못미치는 숫자이다.`,

        author: `영진`
    },
    {
        quote: `관측 가능한 우주에는 약 "2조개"의 은하가 있는것으로 계산된다.
        이는 new horizons의 데이터로 추정한 "2천억"보다 10배 높은 수치이다`,

        author: `Christopher Conselice`
    },
    {
        quote: ` 대한민국의 국민이 되는 요건은 법률로 정한다.
        ② 국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.`,

        author: "대한민국 헌법 제2조" 
    },
    {
        quote: "My formula for greatness in a human being is amor fati \n"
        + " that one wants nothing to be different, not forward, not backward, not in all eternity. \n",
        author: "Ecce Homo, Friedrich Nietzsche"
    },
    {
        quote:"We are not just a collection of atoms, we are a way for the cosmos to know itself. \n",
        author:"Carl Sagan"
    },
    {
        quote: "We all have a limited time on Earth. Life is short, and it is up to us to make it sweet. \n",
        author:"Albert Einstein"
    },
    {
        quote: "It doesn't matter how beautiful your theory is, it doesn't matter how smart you are." +
        "\n If it doesn't agree with experiment, it's wrong.  \n",
        author: "Richard Feynman"
    },
    {
        quote: "Time is what happens when nothing else does. \n",
        author: "Richard Feynman"
    },
    {
        quote: "I think, therefore I am. \n",
        author: "René Descartes"
    },
    {
        quote: "Always recognize that human individuals are ends, and do not use them as means to your end. \n",
        author: "Immanuel Kant"
    },
    {
        quote: "Time is, in itself, a consumable and non-renewable resource. \n",
        author: "aIsaac Newton"
    },
    {
        quote: "We live in a world where there is more and more information, and less and less meaning. \n",
        author: "Gottfried Wilhelm Leibniz"
    },
    {
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall. \n",
        author: "Gottfried Wilhelm Leibniz"
    },
    {
        quote: "Death is the destination we all share. No one has ever escaped it. \n" + 
        "And that is as it should be because death is very likely the single best invention of life. \n",
        author: "Steve Jobs"
    },
    {
        quote: "Memento mori, Memento te hominem esse. Respice post te hominem te esse memento \n" +
        "Remember that you will die, Remember that you are human. \n Look behind you, remember that you are only human \n",

        author: "Roman empire"
    },
    {
        quote: "Throwing away then all things, hold to these only which are few\n" + 
        "and besides bear in mind that every man lives only this present time, which is an indivisible point,  \n" + 
        "and that all the rest of his life is either past or it is uncertain.",
        author: "Meditation, Marcus aurelius"
    }

]

const quoteForm = document.querySelector(".quotes__form");
const regenerateBtn = quoteForm.querySelector("button");


const numQuotes = quotes.length;

/**show random quote on screen */
const setQuote = function () {
    const index = Math.floor(Math.random() * numQuotes);
    const chosen = quotes[index];

    const quoteText = chosen["quote"];
    const authorText = chosen["author"];
    
    const quoteDiv = quoteForm.querySelector(".quotes__form__text");
    const quoteTag = quoteDiv.querySelector(`.quotes__form__text__quote`);
    const authorTag = quoteDiv.querySelector(`.quotes__form__text__author`);

    quoteTag.innerText = quoteText;
    authorTag.innerText = authorText;

}

setQuote();


regenerateBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    setQuote();
})