async function init() {
  let rustApp: any = null;

  try {
    rustApp = await import('../pkg');
  } catch (error) {
    console.error(error);
    return;
  }

  const input = document.getElementById('upload') as HTMLInputElement | null;
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    const base64 = (fileReader.result as string).replace(
      /^data:image\/(png|jpe?g);base64,/,
      ''
    );
    let img_data_url = rustApp.grayscale(base64);
    document.getElementById('new-img').setAttribute('src', img_data_url);
  };

  input?.addEventListener('change', () => {
    fileReader.readAsDataURL(input?.files[0]);
  });
}

init();
