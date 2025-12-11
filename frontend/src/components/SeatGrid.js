"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatGrid = SeatGrid;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
function SeatGrid(_a) {
    var totalSeats = _a.totalSeats, _b = _a.bookedSeats, bookedSeats = _b === void 0 ? [] : _b, selectedSeats = _a.selectedSeats, onSeatClick = _a.onSeatClick, basePrice = _a.basePrice;
    var seats = (0, react_1.useMemo)(function () {
        var rows = [];
        var seatsPerRow = 12;
        var totalRows = Math.ceil(totalSeats / seatsPerRow);
        var seatIndex = 0;
        for (var rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            var rowLetter = String.fromCharCode(65 + rowIndex);
            var rowSeats = [];
            var seatType = void 0;
            var priceMultiplier = void 0;
            if (rowIndex < 2) {
                seatType = 'vip';
                priceMultiplier = 2;
            }
            else if (rowIndex < 5) {
                seatType = 'premium';
                priceMultiplier = 1.5;
            }
            else {
                seatType = 'regular';
                priceMultiplier = 1;
            }
            var seatsInThisRow = Math.min(seatsPerRow, totalSeats - seatIndex);
            var _loop_1 = function (seatNum) {
                var seatNumber = seatIndex + 1;
                var seatId = "".concat(rowLetter).concat(seatNum);
                var isBooked = bookedSeats.includes(seatNumber);
                var isSelected = selectedSeats.some(function (s) { return s.id === seatId; });
                rowSeats.push({
                    id: seatId,
                    row: rowLetter,
                    number: seatNum,
                    type: seatType,
                    status: isBooked ? 'booked' : isSelected ? 'selected' : 'available',
                    price: basePrice * priceMultiplier,
                });
                seatIndex++;
            };
            for (var seatNum = 1; seatNum <= seatsInThisRow; seatNum++) {
                _loop_1(seatNum);
            }
            rows.push({ row: rowLetter, seats: rowSeats, type: seatType });
        }
        return rows;
    }, [totalSeats, bookedSeats, selectedSeats, basePrice]);
    var handleSeatClick = function (seat) {
        if (seat.status === 'booked')
            return;
        onSeatClick(seat);
    };
    return (<div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl">
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"/>
          <div className="h-8 bg-gradient-to-b from-primary/30 to-transparent rounded-t-[100%] blur-sm"/>
          <p className="text-center text-xs text-muted-foreground mt-2 uppercase tracking-widest">
            Screen
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 perspective-1000">
        {seats.map(function (row, rowIndex) {
            var curveOffset = Math.abs(rowIndex - seats.length / 2) * 2;
            return (<div key={row.row} className="flex items-center gap-2 justify-center" style={{
                    transform: "translateY(".concat(curveOffset, "px)"),
                }}>
              <span className="w-6 text-xs font-medium text-muted-foreground">
                {row.row}
              </span>
              
              <div className="flex gap-1">
                {row.seats.map(function (seat, seatIndex) {
                    var hasAisleAfter = seatIndex === Math.floor(row.seats.length / 2) - 1;
                    return (<react_1.default.Fragment key={seat.id}>
                      <button onClick={function () { return handleSeatClick(seat); }} disabled={seat.status === 'booked'} className={(0, utils_1.cn)('seat-base relative group', seat.status === 'booked' && 'seat-booked', seat.status === 'selected' && 'seat-selected', seat.status === 'available' && seat.type === 'vip' && 'seat-vip', seat.status === 'available' && seat.type === 'premium' && 'seat-premium', seat.status === 'available' && seat.type === 'regular' && 'seat-available')} title={"".concat(seat.id, " - $").concat(seat.price.toFixed(2))}>
                        <span className="text-[10px] font-medium opacity-70">
                          {seat.number}
                        </span>
                        
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-border">
                          {seat.id} - ${seat.price.toFixed(2)}
                        </div>
                      </button>
                      {hasAisleAfter && <div className="w-6"/>}
                    </react_1.default.Fragment>);
                })}
              </div>
              
              <span className="w-6 text-xs font-medium text-muted-foreground">
                {row.row}
              </span>
            </div>);
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-md bg-[hsl(var(--seat-available))]"/>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-md bg-primary glow-primary"/>
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-md bg-[hsl(var(--seat-booked))] opacity-50"/>
          <span className="text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-md bg-[hsl(var(--seat-vip))]"/>
          <span className="text-muted-foreground">VIP (2x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-md bg-[hsl(var(--seat-premium))]"/>
          <span className="text-muted-foreground">Premium (1.5x)</span>
        </div>
      </div>
    </div>);
}
