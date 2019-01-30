package com.team22.backend.Entity;
import javax.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Data
@Getter @Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Check")
public class Check {
    @Id
    @SequenceGenerator(name="check_seq",sequenceName="check_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="check_seq")
    @Column(name="Check_ID",unique = true, nullable = false)
     
    private @NonNull Long checkId;
    private @NonNull String checkIDs;
    private @NonNull String checkComment;
    private @NonNull String checkLevel;
}