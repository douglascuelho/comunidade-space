document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-field-button");
    const form = document.getElementById("dynamic-form");
    const formNameInput = document.getElementById("form-name");

    addButton.addEventListener("click", function() {
        const labelText = prompt("Insira o título do campo:");
        if (labelText) {
            addField(labelText);
        }
    });

    formNameInput.addEventListener("input", function() {
        form.setAttribute('data-form-name', formNameInput.value);
    });

    function addField(labelText) {

        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("field-container");


        const label = document.createElement("label");
        label.textContent = labelText + ": ";
        label.htmlFor = labelText.toLowerCase().replace(/\s+/g, '-');


        const input = document.createElement("input");
        input.type = "text";
        input.name = labelText.toLowerCase().replace(/\s+/g, '-');
        input.id = labelText.toLowerCase().replace(/\s+/g, '-');


        const removeButton = document.createElement("img");
        removeButton.src = "remove-button.png"; 
        removeButton.alt = "Remover";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", function() {
            form.removeChild(fieldContainer);
        });

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        fieldContainer.appendChild(removeButton);

        form.appendChild(fieldContainer);
    }
});
