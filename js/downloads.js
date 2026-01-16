const baseUrl = 'https://github.com/mohamed7-dev/vidora/releases/latest/download'

const PLATFORM_CONFIGS = [
  {
    key: 'windows',
    name: 'Windows',
    description: 'Best choice for Windows 10 & 11 desktops and laptops.',
    formats: [
      {
        key: 'exe',
        label: 'EXE installer',
        subtitle: 'Standard 64-bit installer (.exe)',
        badgeLabel: 'EXE',
        url: `${baseUrl}/Vidora-1.0.0-setup.exe`
      },
      {
        key: 'msi',
        label: 'MSI package',
        subtitle: 'For managed / enterprise deployments (.msi)',
        badgeLabel: 'MSI',
        url: `${baseUrl}/Vidora_Win.msi`
      }
    ]
  },
  {
    key: 'macos',
    name: 'macOS',
    description: 'Optimized builds for Intel and Apple Silicon Macs.',
    formats: [
      {
        key: 'dmg-intel',
        label: 'Intel macOS (.dmg)',
        subtitle: 'For Intel-based Macs',
        badgeLabel: 'INTEL',
        url: `${baseUrl}/Vidora_Mac_x64.dmg`
      },
      {
        key: 'dmg-arm',
        label: 'Apple Silicon (.dmg)',
        subtitle: 'For M1/M2/M3 Apple Silicon Macs',
        badgeLabel: 'ARM',
        url: `${baseUrl}/Vidora_Mac_arm64.dmg `
      }
    ]
  },
  {
    key: 'linux',
    name: 'Linux',
    description: 'Pick the package format that matches your distribution.',
    formats: [
      {
        key: 'appimage',
        label: 'AppImage',
        subtitle: 'Portable 64-bit AppImage',
        badgeLabel: 'APP',
        url: `${baseUrl}/Vidora_Linux.AppImage `
      },
      {
        key: 'deb',
        label: 'DEB package',
        subtitle: 'Debian, Ubuntu and derivatives (.deb)',
        badgeLabel: 'DEB',
        url: `${baseUrl}/Vidora_Linux.deb `
      },
      {
        key: 'rpm',
        label: 'RPM package',
        subtitle: 'Fedora, RHEL, openSUSE and others (.rpm)',
        badgeLabel: 'RPM',
        url: `${baseUrl}/Vidora_Linux.rpm `
      }
    ]
  }
]

function openDownload(url) {
  if (!url) return

  // Create an invisible anchor to trigger a direct download/navigation.
  const a = document.createElement('a')
  a.href = url
  a.rel = 'noopener noreferrer'
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function renderPlatformSections() {
  const container = document.getElementById('download-sections')
  if (!container) return

  const html = PLATFORM_CONFIGS.map(function (platform) {
    const formatsHtml = platform.formats
      .map(function (format) {
        return (
          '<button type="button"' +
          ' class="group flex flex-col items-start justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left shadow-sm hover:border-sky-500/70 hover:bg-slate-900 transition-colors"' +
          ' data-download-url="' +
          format.url +
          '">' +
          '<div class="flex items-center justify-between w-full mb-3">' +
          '<div>' +
          '<h3 class="text-sm font-semibold text-slate-100">' +
          format.label +
          '</h3>' +
          '<p class="text-xs text-slate-400 mt-1">' +
          format.subtitle +
          '</p>' +
          '</div>' +
          '<span class="inline-flex items-center justify-center rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/40 px-2 h-6 text-[0.6rem] font-semibold">' +
          format.badgeLabel +
          '</span>' +
          '</div>' +
          '<span class="mt-auto inline-flex items-center text-xs font-medium text-sky-400 group-hover:text-sky-300">' +
          'Download ' +
          format.label +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-3 w-3">' +
          '<path d="M5 12h14" />' +
          '<path d="m12 5 7 7-7 7" />' +
          '</svg>' +
          '</span>' +
          '</button>'
        )
      })
      .join('')

    return (
      '<section class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">' +
      '<div class="flex items-center justify-between gap-3 mb-4">' +
      '<div>' +
      '<h2 class="text-base sm:text-lg font-semibold text-slate-50">' +
      platform.name +
      '</h2>' +
      '<p class="text-xs text-slate-400 mt-1">' +
      platform.description +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="mt-3 grid gap-3 sm:grid-cols-2">' +
      formatsHtml +
      '</div>' +
      '</section>'
    )
  }).join('')

  container.innerHTML = html
}

function attachHandlers() {
  const buttons = document.querySelectorAll('[data-download-url]')
  if (!buttons || !buttons.length) return

  buttons.forEach(function (btn) {
    const url = btn.getAttribute('data-download-url')
    btn.addEventListener('click', function () {
      openDownload(url)
    })
  })
}

function init() {
  renderPlatformSections()
  attachHandlers()
}

;(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
