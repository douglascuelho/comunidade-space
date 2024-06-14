document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const closeModal = document.querySelector(".close");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    
    let currentIndex = 0;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentIndex = index;
            openModal(thumbnail);
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);

    function openModal(thumbnail) {
        modal.style.display = "flex";
        modalImage.src = thumbnail.src;
        modalCaption.textContent = thumbnail.alt;
    }

    function showPrevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateModalContent();
    }

    function showNextImage() {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateModalContent();
    }

    function updateModalContent() {
        const thumbnail = thumbnails[currentIndex];
        modalImage.src = thumbnail.src;
        modalCaption.textContent = thumbnail.alt;
    }

    // Função para fechar o modal ao clicar fora
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
