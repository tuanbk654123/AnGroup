using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using FruitManager.Repositories.Interfaces;

namespace FruitManager.Services
{
    using System;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using DataAccess.Models.Dto.ExportProcess;
    using DataAccess.ExceptionFilter.Exceptions;
    using FruitManager.Repositories;
    using Microsoft.Extensions.Hosting;
    using NPOI.XSSF.UserModel;
    using NPOI.SS.UserModel;
    using NPOI.SS.Formula.Functions;
    using System.Globalization;
    using Microsoft.OpenApi.Extensions;

    internal sealed class ImportProcessService : IImportProcessService
    {
        private readonly IImportProcessRepository ImportProcessRepository;
        private readonly IImportReportRepository importReportRepository;
        private readonly IImportPriceRepository importPriceRepository;
        private readonly IGardenRepository gardenRepository;

        public ImportProcessService(IImportProcessRepository ImportProcessRepository, IImportPriceRepository importPriceRepository, IGardenRepository gardenRepository, IImportReportRepository importReportRepository)
        {
            this.ImportProcessRepository = ImportProcessRepository;
            this.importPriceRepository = importPriceRepository;
            this.gardenRepository = gardenRepository;
            this.importReportRepository = importReportRepository;
        }

        public async Task<bool> Create(CreateImportProcessDto createImportProcessDto, CancellationToken cancellationToken = default)
        {

            ImportProcess ImportProcess = new ImportProcess();
            ImportProcess = createImportProcessDto?.Adapt<ImportProcess>();
            ImportProcess.Id = Guid.NewGuid().ToString();
            ImportProcess.DateImport = DateTime.UtcNow;
            // Tính tổng 
            ImportProcess.SumWeighKemLon = (float)(ImportProcess.WeighKemLon?.Sum(x => x));
            ImportProcess.SumWeighKem2 = (float)(ImportProcess.WeighKem2?.Sum(x => x));
            ImportProcess.SumWeighKem3 = (float)(ImportProcess.WeighKem3?.Sum(x => x));
            ImportProcess.SumWeighRXo = (float)(ImportProcess.WeighRXo?.Sum(x => x));
            ImportProcess.SumWeighR1 = (float)(ImportProcess.WeighR1?.Sum(x => x));
            ImportProcess.SumWeighR2 = (float)(ImportProcess.WeighR2?.Sum(x => x));
            ImportProcess.SumWeighR3 = (float)(ImportProcess.WeighR3?.Sum(x => x));
            ImportProcess.TotalSumWeigh = ImportProcess.SumWeighKemLon + ImportProcess.SumWeighKem2 + ImportProcess.SumWeighKem3 + ImportProcess.SumWeighRXo + ImportProcess.SumWeighR1
                + ImportProcess.SumWeighR2 + ImportProcess.SumWeighR3;
            // Lấy thông tin giá hôm nay
            Pageable pageable = new Pageable();
            pageable.PageSize = 1;
            pageable.PageNumber = 1;
            SearchImportPriceDto searchImportPriceDto = new SearchImportPriceDto();
            searchImportPriceDto.fromDate = ImportProcess.DateImport ;
            searchImportPriceDto.toDate = ImportProcess.DateImport ;
            var importPriceToday = await importPriceRepository.Search(pageable, searchImportPriceDto);
         
            if (importPriceToday != null)
            {
                List<ImportPrice> importPrices = (List<ImportPrice>)importPriceToday.Content;
                if(importPrices != null && importPrices.Count>0)
                {
                    ImportPrice importPrice = importPrices[0];
                    ImportProcess.SumPriceKemLon = ImportProcess.SumWeighKemLon * importPrice.PriceKemLon;
                    ImportProcess.SumPriceKem2 = ImportProcess.SumWeighKem2 * importPrice.PriceKem2;
                    ImportProcess.SumPriceKem3 = ImportProcess.SumWeighKem3 * importPrice.PriceKem3;
                    ImportProcess.SumPriceRXo = ImportProcess.SumWeighRXo * importPrice.PriceRXo;
                    ImportProcess.SumPriceR1 = ImportProcess.SumWeighR1 * importPrice.PriceR1;
                    ImportProcess.SumPriceR2 = ImportProcess.SumWeighR2 * importPrice.PriceR2;
                    ImportProcess.SumPriceR3 = ImportProcess.SumWeighR3 * importPrice.PriceR3;
                    ImportProcess.TotalMoeny = ImportProcess.SumPriceKemLon + ImportProcess.SumPriceKem2 + ImportProcess.SumPriceKem3 + ImportProcess.SumPriceRXo + ImportProcess.SumPriceR1
                      + ImportProcess.SumPriceR2 + ImportProcess.SumPriceR3;
                    ImportProcess.IdImportPrice = importPrice.Id;
                }
            }
            ImportProcess.DateImport = DateTime.UtcNow;

            //Thêm mới bản ghi importprocess 
            var result = await ImportProcessRepository.UpdateAsync(x => x.Id, ImportProcess, true);
            return result;
        }

        public async Task<IPage<ImportProcess>> Search(IPageable pageable, SearchImportProcessDto searchImportProcessDto)
        {
            return await ImportProcessRepository.Search(pageable, searchImportProcessDto);
        }
        public async Task<bool> Update(UpdateImportProcessDto updateImportProcessDto, CancellationToken cancellationToken = default)
        {
            var ImportProcess = updateImportProcessDto.Adapt<ImportProcess>();

            // Tính tổng 
            ImportProcess.DateImport = updateImportProcessDto.DateImport ;
            ImportProcess.SumWeighKemLon = (float)(ImportProcess.WeighKemLon?.Sum(x => x));
            ImportProcess.SumWeighKem2 = (float)(ImportProcess.WeighKem2?.Sum(x => x));
            ImportProcess.SumWeighKem3 = (float)(ImportProcess.WeighKem3?.Sum(x => x));
            ImportProcess.SumWeighRXo = (float)(ImportProcess.WeighRXo?.Sum(x => x));
            ImportProcess.SumWeighR1 = (float)(ImportProcess.WeighR1?.Sum(x => x));
            ImportProcess.SumWeighR2 = (float)(ImportProcess.WeighR2?.Sum(x => x));
            ImportProcess.SumWeighR3 = (float)(ImportProcess.WeighR3?.Sum(x => x));
            ImportProcess.TotalSumWeigh = ImportProcess.SumWeighKemLon + ImportProcess.SumWeighKem2 + ImportProcess.SumWeighKem3 + ImportProcess.SumWeighRXo + ImportProcess.SumWeighR1
                + ImportProcess.SumWeighR2 + ImportProcess.SumWeighR3;
            // Lấy thông tin giá hôm nay
            Pageable pageable = new Pageable();
            pageable.PageSize = 1;
            pageable.PageNumber = 1;
            SearchImportPriceDto searchImportPriceDto = new SearchImportPriceDto();
            searchImportPriceDto.fromDate = updateImportProcessDto.DateImport;
            searchImportPriceDto.toDate = updateImportProcessDto.DateImport;
            var importPriceToday = await importPriceRepository.Search(pageable, searchImportPriceDto);

            if (importPriceToday != null)
            {
                List<ImportPrice> importPrices = (List<ImportPrice>)importPriceToday.Content;
                if (importPrices != null && importPrices.Count > 0)
                {
                    ImportPrice importPrice = importPrices[0];
                    ImportProcess.SumPriceKemLon = ImportProcess.SumWeighKemLon * importPrice.PriceKemLon;
                    ImportProcess.SumPriceKem2 = ImportProcess.SumWeighKem2 * importPrice.PriceKem2;
                    ImportProcess.SumPriceKem3 = ImportProcess.SumWeighKem3 * importPrice.PriceKem3;
                    ImportProcess.SumPriceRXo = ImportProcess.SumWeighRXo * importPrice.PriceRXo;
                    ImportProcess.SumPriceR1 = ImportProcess.SumWeighR1 * importPrice.PriceR1;
                    ImportProcess.SumPriceR2 = ImportProcess.SumWeighR2 * importPrice.PriceR2;
                    ImportProcess.SumPriceR3 = ImportProcess.SumWeighR3 * importPrice.PriceR3;
                    ImportProcess.TotalMoeny = ImportProcess.SumPriceKemLon + ImportProcess.SumPriceKem2 + ImportProcess.SumPriceKem3 + ImportProcess.SumPriceRXo + ImportProcess.SumPriceR1
                      + ImportProcess.SumPriceR2 + ImportProcess.SumPriceR3;
                    ImportProcess.IdImportPrice = importPrice.Id;
                }
            }


            // update
            return await ImportProcessRepository.UpdateAsync(x => x.Id, ImportProcess, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ImportProcess = await ImportProcessRepository.GetByIndexAsync(x => x.Id, id);
            if (ImportProcess != null)
            {
                return await ImportProcessRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }

        public async Task<byte[]?> ExportBill(string id)
        {
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFileTemplate");
            using var memoryStream = new MemoryStream();
            string fileName = @"Bill.xlsx";
            ImportProcess importProcess = await ImportProcessRepository.GetByIndexAsync(x => x.Id, id);
            Garden garden  = await gardenRepository.GetByIndexAsync(x => x.Id, importProcess.IdGarden);

            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 1000;
            SearchImportPriceDto searchImportPriceDto = new SearchImportPriceDto();
            searchImportPriceDto.fromDate = importProcess.DateImport;
            searchImportPriceDto.toDate = importProcess.DateImport;
            var content = await importPriceRepository.Search(pageable, searchImportPriceDto);
            List<ImportPrice> importPrices = (List<ImportPrice>)content.Content;
            ImportPrice importPrice = new ImportPrice();
            if (importPrices.Count > 0)
            {
                importPrice = importPrices?[0];
            }

            if (importProcess == null )
            {
                return null;
            }
            else
            {
                // --- Below code would create excel file with dummy data----  
                //file.OpenRead();
                using (var fs = new FileStream(Path.Combine(pathToSave, fileName), FileMode.OpenOrCreate, FileAccess.ReadWrite))
                {
                    fs.Position = 0;
                    XSSFWorkbook workbook = new XSSFWorkbook(fs);
                    ISheet excelSheet = workbook.GetSheetAt(0);

                    //style
                    ICellStyle style = workbook.CreateCellStyle();
                    IFont font = workbook.CreateFont();
                    font.FontName = "Times New Roman";
                    font.FontHeightInPoints = 18;
                    style.SetFont(font);
                    style.WrapText = true;
                    style.VerticalAlignment = VerticalAlignment.Center;



                    //style blod
                    ICellStyle styleBlod = workbook.CreateCellStyle();
                    IFont fontBold = workbook.CreateFont();
                    fontBold.FontName = "Times New Roman";
                    fontBold.FontHeightInPoints = 18;
                    fontBold.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlod.SetFont(fontBold);
                    styleBlod.WrapText = true;
                    styleBlod.Alignment = HorizontalAlignment.Center;
                    styleBlod.VerticalAlignment = VerticalAlignment.Center;

                    ICellStyle styleWithBorder = workbook.CreateCellStyle();
                    IFont fontWithBorder = workbook.CreateFont();
                    fontWithBorder.FontName = "Times New Roman";
                    fontWithBorder.FontHeightInPoints = 18;
                    styleWithBorder.SetFont(fontWithBorder);
                    styleWithBorder.WrapText = true;
                    styleWithBorder.VerticalAlignment = VerticalAlignment.Center;
                    styleWithBorder.Alignment = HorizontalAlignment.Right;
                    styleWithBorder.BorderTop = BorderStyle.Thin;
                    styleWithBorder.BorderLeft = BorderStyle.Thin;
                    styleWithBorder.BorderRight = BorderStyle.Thin;
                    styleWithBorder.BorderBottom = BorderStyle.Thin;

                    ICellStyle styleBlodWithBorder = workbook.CreateCellStyle();
                    IFont fontBoldWithBorder = workbook.CreateFont();
                    fontBoldWithBorder.FontName = "Times New Roman";
                    fontBoldWithBorder.FontHeightInPoints = 18;
                    fontBoldWithBorder.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorder.SetFont(fontBoldWithBorder);
                    styleBlodWithBorder.WrapText = true;
                    styleBlodWithBorder.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorder.Alignment = HorizontalAlignment.Right;
                    styleBlodWithBorder.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorder.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorder.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorder.BorderBottom = BorderStyle.Thin;

                    IRow row;  
                    // sđt + ngày tháng
                    row = excelSheet.GetRow(1);
                    row.CreateCell(1).SetCellValue(garden.PhoneNumber);
                    row.CreateCell(3).SetCellValue(DateTime.UtcNow.ToString("dd'/'MM'/'yyyy' 'HH':'mm"));
                    row.GetCell(1).CellStyle = style;
                    row.GetCell(3).CellStyle = style;
                    var cra = new NPOI.SS.Util.CellRangeAddress(1, 1, 1, 2);
                    excelSheet.AddMergedRegion(cra);
                    //Khách hàng (tên vựa)
                    row = excelSheet.GetRow(2);
                    row.CreateCell(1).SetCellValue(garden.NameGarden);
                    row.GetCell(1).CellStyle = styleBlod;

                    //Stk
                    row = excelSheet.GetRow(3);
                    row.CreateCell(1).SetCellValue(garden.AccountNumber);
                    row.GetCell(1).CellStyle = styleBlod;

                    //tên tk
                    row = excelSheet.GetRow(4);
                    row.CreateCell(1).SetCellValue(garden.Name);
                    row.GetCell(1).CellStyle = styleBlod;

                    //tên ngân hàng
                    row = excelSheet.GetRow(5);
                    row.CreateCell(1).SetCellValue(garden.BankName.GetDisplayName());
                    row.GetCell(1).CellStyle = styleBlod;

                    //Chi tiết Kem 1
                   
                    for( int i = 1; i < importProcess.WeighKemLon?.Count + 1; i ++)
                    {
                        if(i <= 5)
                        {
                            row = excelSheet.GetRow(6);
                            row.CreateCell(i ).SetCellValue(importProcess.WeighKemLon[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <=10)
                        {
                            row = excelSheet.GetRow(7);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighKemLon[i - 1]);
                            row.GetCell(i-5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(8);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighKemLon[i - 1]);
                            row.GetCell(i-10).CellStyle = style;
                        }
                    }

                    for (int i = 1; i < importProcess.WeighKem2?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(9);
                            row.CreateCell(i).SetCellValue(importProcess.WeighKem2[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(10);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighKem2[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(11);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighKem2[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    for (int i = 1; i < importProcess.WeighKem3?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(12);
                            row.CreateCell(i).SetCellValue(importProcess.WeighKem3[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(13);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighKem3[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(14);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighKem3[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    for (int i = 1; i < importProcess.WeighRXo?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(15);
                            row.CreateCell(i).SetCellValue(importProcess.WeighRXo[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(16);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighRXo[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(17);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighRXo[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    for (int i = 1; i < importProcess.WeighR1?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(18);
                            row.CreateCell(i).SetCellValue(importProcess.WeighR1[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(19);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighR1[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(20);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighR1[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    for (int i = 1; i < importProcess.WeighR2?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(21);
                            row.CreateCell(i).SetCellValue(importProcess.WeighR2[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(22);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighR2[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(23);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighR2[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    for (int i = 1; i < importProcess.WeighR3?.Count + 1; i++)
                    {
                        if (i <= 5)
                        {
                            row = excelSheet.GetRow(24);
                            row.CreateCell(i).SetCellValue(importProcess.WeighR3[i - 1]);
                            row.GetCell(i).CellStyle = style;
                        }
                        if (i > 5 && i <= 10)
                        {
                            row = excelSheet.GetRow(25);
                            row.CreateCell(i - 5).SetCellValue(importProcess.WeighR3[i - 1]);
                            row.GetCell(i - 5).CellStyle = style;
                        }
                        if (i > 10 && i <= 15)
                        {
                            row = excelSheet.GetRow(26);
                            row.CreateCell(i - 10).SetCellValue(importProcess.WeighR3[i - 1]);
                            row.GetCell(i - 10).CellStyle = style;
                        }
                    }
                    //
                    row = excelSheet.GetRow(30);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighKemLon);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");   // try with "en-US"
                    string price = importPrice != null ? double.Parse(importPrice.PriceKemLon.ToString()).ToString("#,###", cul.NumberFormat): "0";
                    string pricesum = double.Parse(importProcess.SumPriceKemLon.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(31);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighKem2);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceKem2.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceKem2.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(32);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighKem3);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceKem3.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceKem3.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(33);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighRXo);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceRXo.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceRXo.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(34);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighR1);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceR1.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceR1.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(35);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighR2);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceR2.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceR2.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(36);
                    row.CreateCell(1).SetCellValue(importProcess.SumWeighR3);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    price = importPrice != null ? double.Parse(importPrice.PriceR3.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    pricesum = double.Parse(importProcess.SumPriceR3.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleWithBorder;
                    row.CreateCell(3).SetCellValue(pricesum);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(37);
                    row.CreateCell(2).SetCellValue(importProcess.SumWeighKemLon + importProcess.SumWeighKem2+ importProcess.SumWeighKem3);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(38);
                    row.CreateCell(2).SetCellValue(importProcess.SumWeighRXo + importProcess.SumWeighR1 + importProcess.SumWeighR2 + importProcess.SumWeighR3);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(39);
                    row.CreateCell(2).SetCellValue(importProcess.TotalSumWeigh );
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(40);
                    price = double.Parse(importProcess.TotalMoeny.ToString()).ToString("#,###", cul.NumberFormat);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;


                    workbook.Write(memoryStream);
                    // update trạng thái
                    // update
                    importProcess.statusBill = DataAccess.Models.Enum.StatusBill.DA_THANH_TOAN;
                    var a =  await ImportProcessRepository.UpdateAsync(x => x.Id, importProcess, false);
                    return memoryStream.ToArray();
                }
            }
            
        }

        public async Task<byte[]> ExportRepost(DateTime date)
        {
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFileTemplate");
            using var memoryStream = new MemoryStream();
            string fileName = @"Report_Import.xlsx";
           // List<ImportProcess> importProcess = await ImportProcessRepository.GetListByIndexAsync(x=>x.DateImport , date );

            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 1000;
            SearchImportPriceDto searchImportPriceDto = new SearchImportPriceDto();
            searchImportPriceDto.fromDate = date;
            searchImportPriceDto.toDate = date;
            var a = await importPriceRepository.Search(pageable, searchImportPriceDto);
            List<ImportPrice> importPrices = (List<ImportPrice>)a.Content;


            ImportPrice importPrice = importPrices[0];


            SearchImportProcessDto searchImportReportDto = new SearchImportProcessDto();
            searchImportReportDto.fromDate = date;
            searchImportReportDto.toDate = date;
            var b = await ImportProcessRepository.Search(pageable, searchImportReportDto);
            List<ImportProcess> importProcess = (List<ImportProcess>)b.Content;

            //ImportPrice importPrice = await importPriceRepository.GetByIndexAsync(x => x.DateImport, date);

            if (importProcess == null)
            {
                return null;
            }
            else
            {
                // --- Below code would create excel file with dummy data----  
                //file.OpenRead();
                using (var fs = new FileStream(Path.Combine(pathToSave, fileName), FileMode.OpenOrCreate, FileAccess.ReadWrite))
                {
                    fs.Position = 0;
                    XSSFWorkbook workbook = new XSSFWorkbook(fs);
                    ISheet excelSheet = workbook.GetSheetAt(0);


                    ICellStyle styleBlodWithBorder = workbook.CreateCellStyle();
                    IFont fontBoldWithBorder = workbook.CreateFont();
                    fontBoldWithBorder.FontName = "Times New Roman";
                    fontBoldWithBorder.FontHeightInPoints = 18;
                    fontBoldWithBorder.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorder.SetFont(fontBoldWithBorder);
                    styleBlodWithBorder.WrapText = true;
                    styleBlodWithBorder.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorder.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorder.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorder.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorder.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorder.BorderBottom = BorderStyle.Thin;
    
                    IRow row;
                    float sKemLon = 0;
                    float sKem2 = 0;
                    float sKem3 = 0;
                    float sRXo = 0;
                    float sR1 = 0;
                    float sR2 = 0;
                    float sR3 = 0;
                    for (int i = 0 ; i < importProcess.Count; i ++){
                        sKemLon += importProcess[i].SumWeighKemLon;
                        sKem2 += importProcess[i].SumWeighKem2;
                        sKem3 += importProcess[i].SumWeighKem3;
                        sRXo += importProcess[i].SumWeighRXo;
                        sR1 += importProcess[i].SumWeighR1;
                        sR2 += importProcess[i].SumWeighR2;
                        sR3 += importProcess[i].SumWeighR3;
                    }
                    row = excelSheet.GetRow(0);
                    string formatted = date.ToString("dd.MM.yyyy");
                    row.CreateCell(1).SetCellValue(formatted);
                    row.GetCell(1).CellStyle = styleBlodWithBorder;
                    CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");   // try with "en-US"
                    //
                    string price = importPrice != null ? double.Parse(importPrice.PriceKemLon.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2);
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceKem2.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(3).SetCellValue(price);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceKem3.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(4).SetCellValue(price);
                    row.GetCell(4).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceRXo.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(5).SetCellValue(price);
                    row.GetCell(5).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceR1.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(6).SetCellValue(price);
                    row.GetCell(6).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceR2.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(7).SetCellValue(price);
                    row.GetCell(7).CellStyle = styleBlodWithBorder;
                    //
                     price = importPrice != null ? double.Parse(importPrice.PriceR3.ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row = excelSheet.GetRow(2); row.CreateCell(8).SetCellValue(price);
                    row.GetCell(8).CellStyle = styleBlodWithBorder;

                    //============================
                    row = excelSheet.GetRow(4);
                    row.CreateCell(2).SetCellValue(sKemLon);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(3).SetCellValue(sKem2);
                    row.GetCell(3).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(4).SetCellValue(sKem3);
                    row.GetCell(4).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(5).SetCellValue(sRXo);
                    row.GetCell(5).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(6).SetCellValue(sR1);
                    row.GetCell(6).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(7).SetCellValue(sR2);
                    row.GetCell(7).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(4);
                    row.CreateCell(8).SetCellValue(sR3);
                    row.GetCell(8).CellStyle = styleBlodWithBorder;

                    //============================
                    if(sKemLon + sKem2 + sKem3 != 0)
                    {
                        row = excelSheet.GetRow(3);
                        row.CreateCell(2).SetCellValue(Math.Round(sKemLon / (sKemLon + sKem2 + sKem3) * 100, 2) + "%");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(3).SetCellValue(Math.Round(sKem2 / (sKemLon + sKem2 + sKem3) * 100, 2) + "%");
                        row.GetCell(3).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(4).SetCellValue(Math.Round(sKem3 / (sKemLon + sKem2 + sKem3) * 100, 2) + "%");
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                    }
                    else
                    {
                        row = excelSheet.GetRow(3);
                        row.CreateCell(2).SetCellValue( "0%");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(3).SetCellValue( "0%");
                        row.GetCell(3).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(4).SetCellValue( "0%");
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                    }
                    if (sRXo + sR1 + sR2 + sR3 != 0){
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(5).SetCellValue(Math.Round(sRXo / (sRXo + sR1 + sR2 + sR3) * 100, 2) + "%");
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(6).SetCellValue(Math.Round(sR1 / (sRXo + sR1 + sR2 + sR3) * 100, 2) + "%");
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(7).SetCellValue(Math.Round(sR2 / (sRXo + sR1 + sR2 + sR3) * 100, 2) + "%");
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(8).SetCellValue(Math.Round(sR3 / (sRXo + sR1 + sR2 + sR3) * 100, 2) + "%");
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                    }
                    else
                    {
                        row = excelSheet.GetRow(3);
                        row.CreateCell(5).SetCellValue( "0%");
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(6).SetCellValue( "0%");
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(7).SetCellValue("0%");
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        row = excelSheet.GetRow(3);
                        row.CreateCell(8).SetCellValue("0%");
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                    }

                    //============================================================
                    row = excelSheet.GetRow(5);
                    row.CreateCell(2).SetCellValue(sKemLon+ sKem2+ sKem3);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(5);
                    row.CreateCell(5).SetCellValue(sRXo + sR1 + sR2 + sR3);
                    row.GetCell(5).CellStyle = styleBlodWithBorder;

                    //
                    row = excelSheet.GetRow(6);
                    price = importPrice != null ? double.Parse((sKemLon * importPrice.PriceKemLon + sKem2 * importPrice.PriceKem2 + sKem3 * importPrice.PriceKem3).ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row.CreateCell(2).SetCellValue(price);
                    row.GetCell(2).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(6);
                    price = importPrice != null ? double.Parse((sRXo * importPrice.PriceRXo + sR1 * importPrice.PriceR1 + sR2 * importPrice.PriceR2 + sR3 * importPrice.PriceR3).ToString()).ToString("#,###", cul.NumberFormat) : "0";

                    row.CreateCell(5).SetCellValue(price);
                    row.GetCell(5).CellStyle = styleBlodWithBorder;

                    //
                    row = excelSheet.GetRow(7);
                    price = importPrice != null ? double.Parse((sKemLon + sKem2 + sKem3 + sRXo + sR1 + sR2 + sR3).ToString()).ToString("#,###", cul.NumberFormat) : "0";
                    row.CreateCell(7).SetCellValue(price);
                    row.GetCell(7).CellStyle = styleBlodWithBorder;
                    //
                    row = excelSheet.GetRow(8);

                    price = importPrice != null ? double.Parse((sKemLon * importPrice.PriceKemLon + sKem2 * importPrice.PriceKem2 + sKem3 * importPrice.PriceKem3 +
                        sRXo * importPrice.PriceRXo + sR1 * importPrice.PriceR1 + sR2 * importPrice.PriceR2 + sR3 * importPrice.PriceR3).ToString()).ToString("#,###", cul.NumberFormat) : "0";

                    row.CreateCell(7).SetCellValue(price);
                    row.GetCell(7).CellStyle = styleBlodWithBorder;


                    // check nếu có bản ghi báo cáo ngày hôm đó rồi thì xóa đi ghi lại bản ghi mới
                    ImportReport importReport = await importReportRepository.GetByIndexAsync(x => x.DateImport, date);
                    if (importReport != null)
                    {
                        await importReportRepository.Delete(importReport.Id);

                    }
                    CreateImportReportDto createImportReportDto = new CreateImportReportDto();
                    createImportReportDto.DateImport = date.AddHours(7) ;
                    createImportReportDto.PriceKemLon = sKemLon;
                    createImportReportDto.PriceKem2 = sKem2;
                    createImportReportDto.PriceKem3 = sKem3;
                    createImportReportDto.PriceRXo = sRXo;
                    createImportReportDto.PriceR1 = sR1;
                    createImportReportDto.PriceR2 = sR2;
                    createImportReportDto.PriceR3 = sR3;
                    createImportReportDto.RateKemLon = (sKemLon + sKem2 + sKem3) == 0 ?  0  :(float)Math.Round(sKemLon / (sKemLon + sKem2 + sKem3), 2);
                    createImportReportDto.RateKem2 = (sKemLon + sKem2 + sKem3) == 0 ? 0 : (float)Math.Round(sKem2 / (sKemLon + sKem2 + sKem3), 2);
                    createImportReportDto.RateKem3 = (sKemLon + sKem2 + sKem3) == 0 ? 0 : (float)Math.Round(sKem3 / (sKemLon + sKem2 + sKem3), 2);
                    createImportReportDto.RateRXo = (sRXo + sR1 + sR2 + sR3) == 0 ? 0 : (float)Math.Round(sRXo / (sRXo + sR1 + sR2 + sR3), 2);
                    createImportReportDto.RateR1 = (sRXo + sR1 + sR2 + sR3) == 0 ? 0 : (float)Math.Round(sR1 / (sRXo + sR1 + sR2 + sR3), 2);
                    createImportReportDto.RateR2 = (sRXo + sR1 + sR2 + sR3) == 0 ? 0 : (float)Math.Round(sR2 / (sRXo + sR1 + sR2 + sR3), 2);
                    createImportReportDto.RateR3 = (sRXo + sR1 + sR2 + sR3) == 0 ? 0 : (float)Math.Round(sR3 / (sRXo + sR1 + sR2 + sR3), 2);
                    createImportReportDto.SumKgK = sKemLon + sKem2 + sKem3;
                    createImportReportDto.SumKgR = sRXo + sR1 + sR2 + sR3;
                    createImportReportDto.SumKg = sRXo + sR1 + sR2 + sR3 + sKemLon + sKem2 + sKem3;
                    createImportReportDto.SumMoneyR = sKemLon * importPrice.PriceKemLon + sKem2 * importPrice.PriceKem2 + sKem3 * importPrice.PriceKem3;
                    createImportReportDto.SumMoneyK = sRXo * importPrice.PriceRXo + sR1 * importPrice.PriceR1 + sR2 * importPrice.PriceR2 + sR3 * importPrice.PriceR3;
                    createImportReportDto.SumMoney = sKemLon * importPrice.PriceKemLon + sKem2 * importPrice.PriceKem2 + sKem3 * importPrice.PriceKem3 +
                        sRXo * importPrice.PriceRXo + sR1 * importPrice.PriceR1 + sR2 * importPrice.PriceR2 + sR3 * importPrice.PriceR3;


                    ImportReport? ImportReport = new ImportReport();
                    ImportReport = createImportReportDto?.Adapt<ImportReport>();
                    ImportReport.Id = Guid.NewGuid().ToString();

                    var result = await importReportRepository.UpdateAsync(x => x.Id, ImportReport, true);
                    

                    workbook.Write(memoryStream);
   
                    return memoryStream.ToArray();
                }
            }
        }
    }
}