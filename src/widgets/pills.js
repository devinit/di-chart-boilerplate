const createPill = (pillParent, pill) => {
  // create pill list item
  const pillElement = document.createElement('li');
  pillElement.classList.add('m-pills__item');
  pillElement.innerHTML = pill;
  pillParent.appendChild(pillElement);
  // create and add remove button
  const removeButton = document.createElement('button');
  removeButton.setAttribute('type', 'button');
  pillElement.appendChild(removeButton);
  // create button icon
  const icon = document.createElement('i');
  icon.setAttribute('role', 'presentation');
  icon.classList.add(...['ico', 'ico--20', 'ico-cross-slate']);
  removeButton.appendChild(icon);

  return [pillElement, removeButton];
};
const createWidget = () => {
  const widgetWrapper = document.createElement('div');
  widgetWrapper.classList.add('spotlight-banner');

  return widgetWrapper;
};

function PillWidget(options) {
  const widget = {
    pills: options.pills || [],
    onAddListener: options.onAdd,
    onRemoveListener: options.onRemove,
    widget: null,
    init() {
      this.widget = createWidget();
      if (this.pills && this.pills.length) {
        this.pills.forEach((pill) => {
          const button = createPill(this.widget, pill)[1];
          // TODO: save button in pillButtons array
          button.addEventListener('click', (event) => {
            const parent = event.currentTarget.parentElement;
            if (parent) {
              this.remove(parent.innerText);
            }
          });
        });
      }
    },
    add(pill) {
      this.pills.push(pill);
      if (this.onAddListener) {
        this.onAddListener(pill);
      }
    },
    remove(pill) {
      // TODO: actually remove pill
      // this.pills.pop(pill);
      if (this.onRemoveListener) {
        this.onRemoveListener(pill);
      }
    },
    onAdd(onAddListener) {
      this.onAddListener = onAddListener;
    },
    onRemove(onRemoveListener) {
      this.onRemoveListener = onRemoveListener;
    },
  };
  widget.init();

  return widget;
}

export default PillWidget;
