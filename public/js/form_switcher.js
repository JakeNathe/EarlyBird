function showform(form) {
    /*
    * four DIVS: browse, insert, update, delete
    * this function sets one visible the others not
    */
    if (form === 'insert') {
        document.getElementById('select').style.display = 'none';
        document.getElementById('insert').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete-').style.display = 'none';
    } else if (form === 'update') {
        document.getElementById('select').style.display = 'none';
        document.getElementById('insert').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        document.getElementById('delete').style.display = 'none';
    } else if (form === 'delete') {
        document.getElementById('select').style.display = 'none';
        document.getElementById('insert').style.display = 'none';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete').style.display = 'block';
    } else if (form === 'all') {
        document.getElementById('select').style.display = 'block';
        document.getElementById('insert').style.display = 'block';
        document.getElementById('update').style.display = 'block';
        document.getElementById('delete').style.display = 'block';
    } else { //by default display select
        document.getElementById('select').style.display = 'block';
        document.getElementById('insert').style.display = 'none';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
    }
}

function insertItem() {
    showform('insert');
}

function updateItem() {
    showform('update');
}

function deleteItem() {
    showform('delete');
}

function selectItem() {
    showform();
}

function showAll() {
    showform('all');
}
