function tinhToan() {
    var ca = parseFloat(document.getElementById("usr").value);
    var giaCong = parseFloat(document.getElementById("giaCong").value);
    giaCong = isNaN(giaCong) ? 30000 : giaCong;

    if (isNaN(ca)) {
        hienThongBao("Không được để rỗng!", "danger");
        return;
    } else if (ca <= 0) {
        hienThongBao("Không được nhập số <= 0!", "danger");
        return;
    }

    var x = 0.7;
    var soCaPhaiTra = (ca * x * 10) / 10;
    var tienPhaiTra = ca * giaCong;
    var tienLe = soCaPhaiTra - parseInt(soCaPhaiTra);
    var lamTronXuong = Math.floor(soCaPhaiTra * 10) / 10;
    var caLe = soCaPhaiTra - lamTronXuong;
    var lamTronTienLe = tienLe;

    var tienTra = 0;
    var tienChuaBu = 0;
    var giaCaHienTai = 180000;

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
        soCaPhaiTra -= 0.1;
    } else if (tienLe > 0.1 && tienLe < 0.5) {
        tienTra = (Math.round((0.5 - lamTronTienLe) * 10) / 10) * giaCaHienTai;
        tienPhaiTra += tienTra;
        soCaPhaiTra += 0.5 - lamTronTienLe;
        tienChuaBu = tienPhaiTra - tienTra;
    } else if (tienLe > 0.5 && tienLe < 1) {
        tienTra = (Math.round((1 - lamTronTienLe) * 10) / 10) * giaCaHienTai;
        tienPhaiTra += tienTra;
        soCaPhaiTra += 1 - lamTronTienLe;
        tienChuaBu = tienPhaiTra - tienTra;
    }

    var thongBao = "";
    if (tienLe > 0.1 && tienLe < 0.5) {
        thongBao += ca + "kg là được " + (soCaPhaiTra - (0.5 - lamTronTienLe)) + "kg<br/>";
        thongBao += "Tiền công là: " + dinhDangTien(tienChuaBu) + "<br/>";
        thongBao += "Bù thêm = " + dinhDangTien(tienTra) + "<br/>";
        thongBao += "Được: " + soCaPhaiTra + "kg<br/>";
        thongBao += "Số tiền họ phải trả là = " + dinhDangTien(tienPhaiTra);
    } else if (tienLe > 0.5 && tienLe <= 0.6) {
        thongBao += ca + "kg là được " + soCaPhaiTra + "kg<br/>";
        thongBao += "Tiền công là = " + dinhDangTien(tienPhaiTra);
    } else if (tienLe > 0.5 && tienLe < 1) {
        thongBao += ca + "kg là được " + (soCaPhaiTra - (1 - lamTronTienLe)) + "kg<br/>";
        thongBao += "Tiền công là: " + dinhDangTien(tienChuaBu) + "<br/>";
        thongBao += "Bù thêm = " + dinhDangTien(tienTra) + "<br/>";
        thongBao += "Được: " + soCaPhaiTra + "kg<br/>";
        thongBao += "Số tiền họ phải trả là = " + dinhDangTien(tienPhaiTra);
    } else {
        thongBao += ca + "kg là được " + soCaPhaiTra + "kg<br/>";
        thongBao += "Tiền công là = " + dinhDangTien(tienPhaiTra);
    }

    hienThongBao(thongBao, "success");
}

function nhapLai() {
    document.getElementById("usr").value = "";
    document.getElementById("giaCong").value = "";
    document.getElementById("usr").focus();
    document.getElementById("vungHien")?.remove();
}

function dinhDangTien(tien) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(tien);
}

function hienThongBao(message, type) {
    var lines = message.split("<br/>");
    var html = '<div id="vungHien" class="contents">';
    for (var i = 0; i < lines.length; i++) {
        html += '<div class="alert alert-' + type + '">' + lines[i] + "</div>";
    }
    html += "</div>";
    document.getElementById("vungChua").innerHTML = html;
}