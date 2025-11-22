import './image-zoom-popup.scss'

document.addEventListener('dblclick', function (event) {
  if (!event.target) return

  const eventTarget = event.target as Element
  if (eventTarget.tagName === 'IMG') {
    // Don't open if a popup is already open
    if (document.getElementById('image-zoom-popup-overlay')) {
      return
    }

    const clickedImg = eventTarget as HTMLImageElement
    // don't zoom in image label of the link.
    if (clickedImg.closest('a')) return

    const qaDiv = document.getElementById('qa')
    if (!qaDiv) return

    let imgSrc = clickedImg.src
    const baseUrl = window.location.origin

    // Use a relative path if the image is on the same domain.
    if (imgSrc.startsWith(baseUrl)) {
      const url = new URL(imgSrc)
      imgSrc = `${url.pathname}{${url.search}`
    }

    // 1. Create Popup Elements
    const overlay = document.createElement('div')
    overlay.id = 'image-zoom-popup-overlay'

    const imageContainer = document.createElement('div')
    imageContainer.id = 'image-zoom-popup-container'

    const popupImage = document.createElement('img')
    popupImage.src = imgSrc

    const closeButton = document.createElement('div')
    closeButton.id = 'image-zoom-popup-close'
    closeButton.innerText = 'x'

    // 2. Assemble the Popup
    imageContainer.appendChild(popupImage)
    overlay.appendChild(imageContainer)
    overlay.appendChild(closeButton)

    // 3. Add to the DOM
    qaDiv.appendChild(overlay)

    // 4. Add closing behaviors
    const closePopup = () => {
      overlay.remove()
    }

    // Close on background click
    overlay.addEventListener('click', () => {
      closePopup()
    })

    // Close on button click
    closeButton.addEventListener('click', closePopup)
  }
})
