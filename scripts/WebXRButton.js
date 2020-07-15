export function ARButton(renderer, sessionInit = {}) {
  let element = document.createElement("button")
  element.id = "ARButton"

  function showStartAR() {
    let currentSession = null
    element.textContent = "START AR"

    function onSessionStarted(session) {
      renderer.xr.setReferenceSpaceType("local")
      renderer.xr.setSession(session)
      element.disabled = false
      currentSession = session
    }

    element.onclick = function () {
      if (currentSession === null) {
        navigator.xr
          .requestSession("immersive-ar", sessionInit)
          .then(onSessionStarted)
      }
    }
  }

  function showARNotSupported() {
    element.textContent = "NOT SUPPORTED"
    element.disabled = true
  }

  if (navigator.xr) {
    navigator.xr
      .isSessionSupported("immersive-ar")
      .then(function (supported) {
        supported ? showStartAR() : showARNotSupported()
      })
      .catch(showARNotSupported)
  } else {
    showARNotSupported()
  }
  return element
}
