function tinhToan() {
  var ca = document.getElementById("usr").value;

  if (ca === "") {
    hienThongBao("Không được để rỗng!", "danger");
  } else if (ca <= 0) {
    hienThongBao("Không được nhập số <= 0!", "danger");
  } else {
    // x là số để đổi từ hạt sang bột ví dụ 10kg * 0.7 = 7kg
    var x = 0.7;
    // Số cà phải trả họ
    var soCaPhaiTra = (ca * x * 10) / 10;
    // Tiền công
    var tienPhaiTra = ca * 30000;
    // Số cà lẽ ra ví dụ 4,2 -> 0,2
    var tienLe = soCaPhaiTra - parseInt(soCaPhaiTra);
    var lamTronXuong = Math.floor(soCaPhaiTra * 10) / 10;
    var caLe = soCaPhaiTra - lamTronXuong;
    var lamTronTienLe = tienLe;

    var tienTra = 0;
    var tienChuaBu = 0;

    // Lấy theo giá cà phê nhà loại cao
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
      soCaPhaiTra = soCaPhaiTra - 0.1;
    } else if (tienLe > 0.1 && tienLe < 0.5) {
      // Nhân 130000 để ra 13000 ví dụ lamTronTienLe = 0.2 -> 0.5 - 0,2 = 0.3 * 130000 = 39k tức là 1 lạng bù là 13k
      tienTra = (Math.round((0.5 - lamTronTienLe) * 10) / 10) * giaCaHienTai;
      tienPhaiTra += tienTra;
      soCaPhaiTra += 0.5 - lamTronTienLe;
      tienChuaBu = tienPhaiTra - tienTra;
    } else if (tienLe > 0.5 && tienLe < 1) {
      // Nhân 130000 để ra 13000 ví dụ lamTronTienLe = 0.2 -> 0.5 - 0,2 = 0.3 * 130000 = 39k tức là 1 lạng bù là 13k
      tienTra = (Math.round((1 - lamTronTienLe) * 10) / 10) * giaCaHienTai;
      tienPhaiTra += tienTra;
      soCaPhaiTra += 1 - lamTronTienLe;
      tienChuaBu = tienPhaiTra - tienTra;
    }

    var thongBao = "";
    if (tienLe > 0.1 && tienLe < 0.5) {
      thongBao +=
        ca + "kg là được " + (soCaPhaiTra - (0.5 - lamTronTienLe)) + "kg<br/>";
      thongBao += "Tiền công là: " + dinhDangTien(tienChuaBu) + "<br/>";
      thongBao += "Bù thêm = " + dinhDangTien(tienTra) + "<br/>";
      thongBao += "Được: " + soCaPhaiTra + "kg<br/>";
      thongBao += "Số tiền họ phải trả là = " + dinhDangTien(tienPhaiTra);
    } else if (tienLe > 0.5 && tienLe <= 0.6) {
      thongBao += ca + "kg là được " + soCaPhaiTra + "kg<br/>";
      thongBao += "Tiền công là = " + dinhDangTien(tienPhaiTra);
    } else if (tienLe > 0.5 && tienLe < 1) {
      thongBao +=
        ca + "kg là được " + (soCaPhaiTra - (1 - lamTronTienLe)) + "kg<br/>";
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
}

function nhapLai() {
  document.getElementById("usr").value = "";
  document.getElementById("usr").focus();
  document.getElementById("vungHien").style.display = "none";
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
