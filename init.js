window.onload = () => {
    document.getElementById('root').append(createElem(createHTML()));
    return;
};

Object.defineProperty(
    Array.prototype,
    'joinMap', {
        value: function(func){
            return this.map(func).join('');
        }
    }
);

const createElem = (html) => {
    const temp = document.createElement('template');
    temp.innerHTML = html;
    return temp.content;
};

const formatHTML = (html) => {
    return html.trim();
};