$(document).ready(function () {
    $("#btn-login").click(function () {
        var data = $("#form-login").serialize();

        $.ajax({
            url: "http://localhost/desakita-server/login",
            type: "POST",
            data: $("#form-login").serialize(),
            dataType: "JSON",
            success: function (result) {


                var nama = result['data']['nama'];
                var no_kk = result['data']['no_kk'];
                var foto = result['data']['foto'];
                var role = result['data']['role'];

                sessionStorage.setItem("id", no_kk);
                sessionStorage.setItem("nama", nama);
                sessionStorage.setItem("foto", foto);
                sessionStorage.setItem("role", role);

                if (result['message'] == "Kepala Keluarga") {
                    alert("Sukses, Anda Berhasil Login Sebagai Kepala Keluarga");
                    window.location.href =
                        ("home.html");
                } else if (result['message'] == "Administrator") {
                    alert("Sukses, Anda Berhasil Login Sebagai Administrator");
                    window.location.href =
                        ("home.html");
                } else if (result['message'] == "RT") {
                    alert("Sukses, Anda Berhasil Login Sebagai RT");
                    window.location.href =
                        ("home.html");
                } else if (result['message'] == "RW") {
                    alert("Sukses, Anda Berhasil Login Sebagai RW");
                    window.location.href =
                        ("home.html");
                } else {
                    alert("Gagal, User / Password yang Anda gunakan Salah.");
                    window.location.href =
                        "login.html";
                }
            },
            error: function (xhr, Status, err) {
                $("Data Kurang Lengkap : " + Status);
            }
        });
        return false;
    });
    // END LOGIN
    var id = sessionStorage.getItem("id");
    var nama = sessionStorage.getItem("nama");
    var foto = sessionStorage.getItem("foto");
    var role = sessionStorage.getItem("role");


    // HOME
    $("#profil-pengguna").append(`
    <span class="name">` + nama + `</span> 
    <span class = "role" > ` + role + ` </span>
                `);
    $("#foto-pengguna").append(`
    <img src="http://localhost/desakita/assets/fp/` + foto + `" alt="` + nama + `" class="img-circle">
                            `);

    // END HOME

    // DATA KELUARGA

    $("#nomorkk").append(`
    <h3 class="text-center"><strong>SALINAN KARTU KELUARGA</strong></h3>
    <h5 class="text-center"><strong>No. ` + id + `</strong></h5>
                                                    `);
    tampiltabeldata();

    function tampiltabeldata() {
        $.ajax({
            url: "http://localhost/desakita-server/datakeluarga",
            type: "GET",
            dataType: "JSON",
            data: {
                id: id
            },
            success: function (data) {
                var no = 1;
                var no1 = 1;
                $.each(data['data'], function (i, field) {
                    var namalengkap = field.nama;
                    var nik = field.nik;
                    var sex = field.sex;
                    var tempatlahir = field.tempatlahir;
                    var tanggallahir = field.tanggallahir;
                    var agama = field.agama;
                    var pendidikan = field.pendidikan;
                    var pekerjaan = field.pekerjaan;
                    var goldar = field.gol_darah;


                    $("#datakeluarga1").append(`
                    <tr>
                    <td class="text-center">` + no++ + `</td>
                    <td>` + namalengkap + `</td>
                    <td>` + nik + `</td>
                    <td>` + sex + `</td>
                    <td>` + tempatlahir + `</td>
                    <td>` + tanggallahir + `</td>
                    <td>` + agama + `</td>
                    <td>` + pendidikan + `</td>
                    <td>` + pekerjaan + `</td>
                    <td>` + goldar + `</td>
                </tr>
                `);

                });
                $.each(data['data'], function (i, field) {
                    var kawin = field.kawin;
                    var hubungan = field.hubungan;
                    var kewarganegaraan = field.kewarganegaraan;
                    var nama_ayah = field.nama_ayah;
                    var nama_ibu = field.nama_ibu;

                    $("#datakeluarga2").append(`
                    <tr>
                    <td class="text-center">` + no1++ + `</td>
                    <td>` + kawin + `</td>
                    <td>-</td>
                    <td>` + hubungan + `</td>
                    <td>` + kewarganegaraan + `</td>
                    <td>-</td>
                    <td>-</td>
                    <td>` + nama_ayah + `</td>
                    <td>` + nama_ibu + `</td>
                </tr>
                `);
                });

                var alamat = data['data'][0]['alamat'];
                var nama_kk = data['data'][0]['nama'];
                var rt = data['data'][0]['rt'];
                var rw = data['data'][0]['rw'];
                var jumlah_anggota = data['data'][0]['jumlah_anggota'];
                var namadesa = data['desa'][0]['nama_desa'];
                var kades = data['desa'][0]['nama_kepala_desa'];
                var kacet = data['desa'][0]['nama_kecamatan'];
                var kakab = data['desa'][0]['nama_kabupaten'];
                var kodepos = data['desa'][0]['kode_pos'];
                var propinsi = data['desa'][0]['nama_propinsi'];

                const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                let tgl_daftar = new Date(data['data'][0]['tgl_daftar']);
                let formattanggal = tgl_daftar.getDate() + "-" + months[tgl_daftar.getMonth()] + "-" + tgl_daftar.getFullYear();


                $("#alamat").append(`
                <label class="col-sm-3 control-label">ALAMAT</label>
                <div class="col-sm-8">
                    <p class="text-muted">: ` + alamat + `</p>
                </div>
                `);
                $("#rw").append(`
                <label class="col-sm-3 control-label">RT/RW</label>
                <div class="col-sm-9">
                <p class="text-muted">: ` + rt + ` / ` + rw + `</p>
                </div>
                `);
                $("#namadesa").append(`
                <label class="col-sm-3 control-label">DESA / KELURAHAN</label>
                <div class="col-sm-9">
                    <p class="text-muted">: ` + namadesa + `</p>
                </div>
                `);
                $("#kecamatan").append(`
                <label class="col-sm-3 control-label">KECAMATAN</label>
                <div class="col-sm-9">
                    <p class="text-muted">: ` + kacet + `</p>
                </div>
                `);
                $("#kabupaten").append(`
                <label class="col-sm-5 control-label">KABUPATEN</label>
                <div class="col-sm-7">
                    <p class="text-muted">: ` + kakab + `</p>
                </div>
                `);
                $("#kodepos").append(`
                <label class="col-sm-5 control-label">KODE POS</label>
                <div class="col-sm-7">
                    <p class="text-muted">: ` + kodepos + `</p>
                </div>
                `);
                $("#propinsi").append(`
                <label class="col-sm-5 control-label">PROVINSI</label>
                <div class="col-sm-7">
                    <p class="text-muted">: ` + propinsi + `</p>
                </div>
                `);
                $("#jumlah_anggota").append(`
                <label class="col-sm-5 control-label">JUMLAH ANGGOTA</label>
                <div class="col-sm-7">
                    <p class="text-muted">: ` + jumlah_anggota + `</p>
                </div>
                `);
                $("#namadesa2").append(`
                <td width="10%">&nbsp;</td>
                                                                            <td width="70%">&nbsp;</td>
                                                                            <td class="text-center" width="30%">
                                                                                ` + namadesa + `, ` + formattanggal + `</td>
                `);
                $("#namakades").append(`
                <td class="text-center">` + nama_kk + `
                                                                            </td>
                                                                            <td width="50%">&nbsp;</td>
                                                                            <td class="text-center">` + kades + `</td>
                `);

            }
        });

    }
    // END DATA KELUARGA

    // tampiltabeldata();

    // function tampiltabeldata() {
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: "GET",
    //         dataType: "JSON",
    //         success: function (data) {
    //             console.log(data['data']);
    //             var no = 1;
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.kode_karyawan;
    //                 var jenis = field.kode_cabang;
    //                 var nama = field.nama_depan;
    //                 var alamat = field.nama_belakang;
    //                 var bank = field.jenis_kelamin;
    //                 $("#tampildata").append(`
    //                     <tr>
    //                         <td class="text-center">` + no++ + `</td>
    //                         <td class="text-center">` + id + `</td>
    //                         <td class="text-center">` + jenis + `</td>
    //                         <td>` + nama + `</td>
    //                         <td>` + alamat + `</td>
    //                         <td class="text-center">` + bank +
    //                     `</td>
    //                         <td class="text-center">
    //                             <button type="button" class="btn btn-warning item_edit" name="item_edit" title="Edit" data-toggle="modal" id="` +
    //                     id +
    //                     `" onclick=""><i class="fa fa-edit"></i></button>
    //                             <button type="button" class="btn btn-danger item_hapus"  title="Hapus" data-toggle="modal"id="` +
    //                     id + `"><i class="fa fa-times"></i></button>
    //                         </td>
    //                     </tr> 
    //                 `);
    //             });
    //             $('#tabeldata').DataTable();
    //         }
    //     });

    // }
    // $("#btn-tambah").click(function () {
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: "POST",
    //         data: $("#form-tambah").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil ditambahkan");
    //                 $('#tambah').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal ditambahkan");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
    // $(document).on('click', '.item_edit', function () {
    //     var id = $(this).attr('id');
    //     console.log(id);
    //     $.ajax({
    //         type: "GET",
    //         url: "http://localhost/desakita-server/karyawan",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             console.log(data['data']);
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.id;
    //                 var jenis = field.jenis;
    //                 var nama = field.nama_pp;
    //                 var alamat = field.alamat_pp;
    //                 var bank = field.switching;
    //                 $('[id="ide"]').val(id);
    //                 $('[id="jenise"]').val(jenis);
    //                 $('[id="namae"]').val(nama);
    //                 $('[id="alamate"]').val(alamat);
    //                 $('[id="banke"]').val(bank);
    //             });
    //             $('#edit').modal('show');
    //         }
    //     });
    // });
    // $(document).on('click', '#btn-edit', function () {
    //     var data = $("#form-edit").serialize();
    //     console.log(data);
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: 'PUT',
    //         data: $("#form-edit").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil dirubah");
    //                 $('#edit').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal dirubah");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
    // $(document).on('click', '.item_hapus', function () {
    //     var id = $(this).attr('id');
    //     console.log(id);
    //     $.ajax({
    //         type: "GET",
    //         url: "http://localhost/desakita-server/karyawan",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             console.log(data['data']);
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.kode_karyawan;
    //                 var nama = field.nama_depan;
    //                 $('[id="idh"]').val(id);
    //                 $('[id="namah"]').val(nama);
    //             });
    //             $('#hapus').modal('show');
    //         }
    //     });
    // });
    // $(document).on('click', '.btn-hapus', function () {
    //     var id = $("#form-hapus").serialize();
    //     console.log(id);
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: "DELETE",
    //         data: $("#form-hapus").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil dihapus");
    //                 $('#hapus').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal dihapus");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
});