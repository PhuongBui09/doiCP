function tinhToan() {
    var ca = document.getElementById('usr').value;

    if (ca === "") {
        document.getElementById('vungChua').innerHTML = '<div class="alert alert-danger">Không được để rỗng!</div>';
    } else if (ca <= 0) {
        document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-danger">Không được nhập số <= 0!</div></div>';
    } else if(ca != parseFloat(ca)) {
        document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-danger">Vui lòng sài kí tự "." thay cho kí tự ","!</div></div>';
    } else {

        var x = 0.7;
        var soCaPhaiTra = ((ca * x) * 10) / 10;
        var tienPhaiTra = (ca * 20000);
        var tienLe = soCaPhaiTra - parseInt(soCaPhaiTra);
        var lamTronXuong = Math.floor(soCaPhaiTra * 10) / 10;
        var caLe = soCaPhaiTra - lamTronXuong;
        var lamTronTienLe = tienLe;

        var tienTra = 0;
        var tienChuaBu = 0;

        if (caLe > 0.08 && caLe < 0.1) {
            lamTronTienLe = Math.ceil(tienLe * 10) / 10;
            soCaPhaiTra = Math.ceil(soCaPhaiTra * 10) / 10;
        }
        if (caLe >= 0.01 && caLe <= 0.08) {
            soCaPhaiTra = lamTronXuong;
            lamTronTienLe = Math.floor(tienLe * 10) / 10;
        }

        tienLe = lamTronTienLe;
        if (tienLe == 0.1 || (tienLe > 0.5 && tienLe <= 0.6)) {
            soCaPhaiTra = soCaPhaiTra - 0.1;
        }else if (tienLe > 0.1 && tienLe < 0.5) {
            tienTra = (Math.round((0.5 - lamTronTienLe) * 10) / 10) * 100000;
            tienPhaiTra += tienTra;
            soCaPhaiTra += (0.5 - lamTronTienLe);
            tienChuaBu = tienPhaiTra - tienTra;
        } else if (tienLe > 0.5 && tienLe < 1) {
            tienTra = (Math.round((1 - lamTronTienLe) * 10) / 10) * 100000;
            tienPhaiTra += tienTra;
            soCaPhaiTra += (1 - lamTronTienLe);
            tienChuaBu = tienPhaiTra - tienTra;
        }

        if (tienLe > 0.1 && tienLe < 0.5) {

            document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-success">'
            + ca + 'kg là được ' + ((soCaPhaiTra - (0.5 - lamTronTienLe))) + 'kg</div><div class="alert alert-success">Tiền công là: ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienChuaBu) + '</div><div class="alert alert-success">Bù thêm = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienTra) + '</div><div class="alert alert-success">Được: ' + (soCaPhaiTra) + 'kg' + '</div><div class="alert alert-success">Số tiền họ phải trả là = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienPhaiTra) + '</div></div>';

        }else if((tienLe > 0.5 && tienLe <= 0.6)) {

            document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-success">' 
            + ca + 'kg là được ' + (soCaPhaiTra) + 'kg</div><div class="alert alert-success">' + 'Tiền công là = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienPhaiTra) + '</div></div>';

        }else if (tienLe > 0.5 && tienLe < 1) {

            document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-success">'
            + ca + 'kg là được ' + ((soCaPhaiTra - (1 - lamTronTienLe))) + 'kg</div><div class="alert alert-success">Tiền công là: ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienChuaBu) + '</div><div class="alert alert-success">Bù thêm = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienTra) + '</div><div class="alert alert-success">Được: ' + (soCaPhaiTra) + 'kg' + '</div><div class="alert alert-success">Số tiền họ phải trả là = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienPhaiTra) + '</div></div>';

        }else {

            document.getElementById('vungChua').innerHTML = '<div id="vungHien" class="contents"><div class="alert alert-success">' 
            + ca + 'kg là được ' + (soCaPhaiTra) + 'kg</div><div class="alert alert-success">' + 'Tiền công là = ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tienPhaiTra) + '</div></div>';

        }
    }
}

function nhapLai() {
    document.getElementById('usr').value = "";
    document.getElementById('vungHien').style.display = 'none';
}