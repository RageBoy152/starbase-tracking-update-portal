export function camelToCapitalized(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (match) => match.toUpperCase());
}



//    THIS FUNCTION HAS LOGIC ERROR - collapsing child nodes
export function toggleInputGroup(e) {
  // hide all child nodes if hiding
  // $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content-heading i.bi-dash-square')).toggleClass('bi-plus-square bi-dash-square');
  // $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content')).filter(':visible').slideUp();
  
  // toggle hide node
  $(e.currentTarget.parentNode.querySelector('.collapse-content')).slideToggle();
  
  // toggle dropdown btn icon
  $(e.currentTarget.querySelector('i')).toggleClass('bi-plus-square bi-dash-square');
}



function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }



export function copyText(text, link) {
  navigator.clipboard.writeText(text);

  $(link).addClass('hover:bg-green-700 bg-green-700');
  $(link).removeClass('hover:text-black hover:bg-white');
  
  delay(1000).then(() => {
    $(link).removeClass('hover:bg-green-700 bg-green-700');
    $(link).addClass('hover:text-black hover:bg-white');
  })
}





function formatHardwareBarrelText(object) {
  let hardwareBarrelText = '';
  let barrelCount = parseInt(object.options.barrels.split('_')[1]);

  if (barrelCount != 6 && barrelCount != 0) {
    let totalBarrels = 0;

    Object.keys(object.options.barrelConfig).forEach((barrel, index) => {
      if (object.options.barrelConfig[barrel].barrelRings == null || index > barrelCount) { return; }

      totalBarrels += parseInt(object.options.barrelConfig[barrel].barrelRings.split('_')[3]);
    });

    hardwareBarrelText = `N:${totalBarrels}`;
  }
  else if (barrelCount == 0) { hardwareBarrelText = 'NC' }

  return hardwareBarrelText;
}


export function formatObjectNameText(object) {
  let returnObj = [null, ''];

  if (object.hardwareType.includes(':')) {
    let parsedObjectName = `${object.prefabPath.split('/')[0]} ${object.objectSN.split('_')[1]}`;
    let barrelDescriptor = object.hardwareType;

    return [(
      <>
        <p>{parsedObjectName}</p>
        <p>{barrelDescriptor}</p>
      </>
    ), `${parsedObjectName}\n${barrelDescriptor}`];
  }
  else if (object.prefabPath.includes('SPMT')) {
    return [(
      <>
        <p>{object.hardwareType}</p>
      </>
    ), `${object.hardwareType}`];
  }

  if (object.objectName.split('_')[1] == '') {
    let parsedObjectName = object.objectSN != null ? `${object.hardwareType} ${object.objectSN.split('_')[1]}` : '';
    let barrelDescriptor = object.options.barrels != null && formatHardwareBarrelText(object);

    returnObj[0] = (
      <>
        <p>{parsedObjectName}</p>
        <p>{barrelDescriptor}</p>
      </>
    );

    returnObj[1] = `${parsedObjectName}${barrelDescriptor ? `\n${barrelDescriptor}` : ''}`;
  }
  else {
    let objectName = object.objectName.split('_')[1];

    returnObj[0] = (
      objectName.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))
    );

    returnObj[1] = objectName;
  }


  return returnObj;
}