class Validation {
    constructor() {
        this.setInputListener = this.setInputListener.bind(this);
    }

    run(form, inputs, button) {
        this.form = form;
        this.inputs = [...inputs];
        this.button = button;

        this.setInputListener();
    }

    setInputListener() {
        this.inputs.forEach((input) => {
            input.addEventListener('input', (event) => {
                const input = event.target;
                const inputId = event.target.id;
        
                const inputStatus = this.inputValidation(input, inputId);

                this.switchError(inputStatus, inputId);
                this.checkInputsState();
            });
        });
    }

    inputValidation(input) {
        const regexp = /^[a-zA-Zа-яёА-ЯЁ\\-\s]{2,30}$/gi;
    
        let validationResult = regexp.test(input.value) && input.value.trim() !== '';

        return validationResult;
    }

    switchError(status, id) {
        const error = document.querySelector(`#error-${id}`);

        if (status === true) {
            error.textContent = '';
        } else {
            error.textContent = 'Введите верное название города (от 2 до 30 символов)';
        }
    }

    checkInputsState() {
        const result = this.inputs.map((input) => {
            return this.inputValidation(input, input.id);
        });

        this.switchButton(result);
    }

    switchButton(status) {
        if (status.includes(false)) {
            this.button.classList.remove('form__button_active');
            this.button.setAttribute('disabled', true);
        } else {
            this.button.classList.add('form__button_active');
            this.button.removeAttribute('disabled', true);
        }
    }
}
