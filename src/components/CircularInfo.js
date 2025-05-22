export class CircularInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const size = parseInt(this.getAttribute('size')) || 300;
        const radius = size / 2 -30;

        const items = this.querySelectorAll('info-item');
        const angleStep = 360 / items.length;

        const container = document.createElement('div');
        const hole = document.createElement('div');
        hole.classList.add("hole")
        container.classList.add('container');
        container.appendChild(hole)
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;

        items.forEach((item, i) => {
            const clone = item.cloneNode(true);
            clone.setAttribute('data-angle', `${i * angleStep}deg`);
            clone.style.setProperty('--i', `${i}`)
            clone.style.setProperty('--angle', `${i * angleStep}deg`);
            clone.style.setProperty('--radius', `${radius}px`);
            clone.classList.add('item');
            container.appendChild(clone);
        });

        this.shadowRoot.innerHTML = `
      <style>
        .container {
          background: linear-gradient(to bottom, #4863B5, #202B4F);
          position: relative;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item {
          position: absolute;
          top: calc(50% - 48px);
          left: calc(50% - 48px);
          transform: rotate(var(--angle)) translate(calc(var(--radius) - 48px)) rotate(calc(-1 * var(--angle)));
          transform-origin: center;
          text-align: center;
          cursor: pointer;
        }

        .item .icon {
          font-size: 48px;
        }
        
        .hole {
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: #0f142a;
        }

        .item .tooltip {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: black;
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .item:hover .tooltip {
          opacity: 1;
        }
      </style>
    `;
        this.shadowRoot.appendChild(container);
    }
}
customElements.define('circular-info', CircularInfo);


export class InfoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)));
          transform-origin: center;
          text-align: center;
          cursor: pointer;
        }

        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 96px;
          height: 96px;
        }

        .background-svg {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 96px;
          height: 96px;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease, rotate 0.3s ease;
          transform: scale(0.8);
        }

        .background-svg img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .icon {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        ::slotted(img) {
          width: 100%;
          height: 100%;
        }

        .tooltip {
          position: absolute;
          font-family: Arial, sans-serif;
          background-color: #4863B5;
          color: white;
          font-size: 14px;
          padding: 12px;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          min-width: 200px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .tooltip h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: bold;
        }

        .tooltip p {
          margin: 0;
          line-height: 1.4;
        }

        :host(:hover) .tooltip {
          opacity: 1;
        }

        /* Position tooltips consistently on the right side of the container */
        .tooltip {
          position: absolute;
          left: calc(100% + 20px);
          top: 50%;
          transform: translateY(-50%);
          margin-left: 20px;
        }

        /* Adjust positioning for bottom items */
        :host([data-angle="-90deg"]) .tooltip,
        :host([data-angle="-135deg"]) .tooltip,
        :host([data-angle="-180deg"]) .tooltip,
        :host([data-angle="-225deg"]) .tooltip,
        :host([data-angle="-270deg"]) .tooltip {
          top: 100%;
          transform: translateY(8px);
          left: 50%;
          transform: translateX(-50%);
        }

        :host(:hover) .background-svg {
          opacity: 1;
          transform: scale(2.00);
        }
      </style>

      <div class="wrapper">
        <div class="background-svg">
          <img style="width: 96px; height:96px;" src="/assets/svg/triangle.svg" alt="" />
        </div>
        <span class="icon">
          <slot></slot>
        </span>
      </div>
      <div class="tooltip">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;
    }
}

customElements.define('info-item', InfoItem);

